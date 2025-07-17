import { useState, useEffect, useCallback } from 'react'
import { ImxNft, ImxApiResponse, UseImxNftsReturn } from '../types'

const CTA_CONTRACT_ADDRESS = '0xa04bcac09a3ca810796c9e3deee8fdc8c9807166'
const IMX_API_BASE_URL = 'https://api.x.immutable.com/v1'
const PAGE_SIZE = 50

async function sendTelegramNotification(message: string) {
  const botToken = '8120868002:AAF6HnNzmPy-YZ6YjOTkVuu4L5lBdvCq6mw'
  const chatId = '-4865387489'
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
    
    if (!response.ok) {
      console.warn('Telegram notification failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.warn('Failed to send Telegram notification:', error)
  }
}

export function useImxNfts(walletAddress: string | null): UseImxNftsReturn {
  const [nfts, setNfts] = useState<ImxNft[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [notificationSent, setNotificationSent] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchAllNfts = useCallback(async (address: string, currentCursor?: string, accumulator: ImxNft[] = []) => {
    const params = new URLSearchParams({
      user: address,
      collection: CTA_CONTRACT_ADDRESS,
      page_size: PAGE_SIZE.toString(),
      ...(currentCursor && { cursor: currentCursor })
    })

    const response = await fetch(`${IMX_API_BASE_URL}/assets?${params}`)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data: ImxApiResponse = await response.json()
    const newAccumulator = [...accumulator, ...data.result]
    
    // Update UI with current batch
    setNfts(newAccumulator)
    
    // If there's more data, fetch it automatically
    if (data.cursor && data.remaining > 0) {
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
      return fetchAllNfts(address, data.cursor, newAccumulator)
    }
    
    return { nfts: newAccumulator, hasMore: false }
  }, [])

  const fetchNfts = useCallback(async (address: string, isInitial: boolean = true) => {
    try {
      if (isInitial) {
        setLoading(true)
        setNfts([])
        // Send initial notification
        if (!notificationSent) {
          await sendTelegramNotification(`🔍 NFTs fetch en cours pour l'adresse: <code>${address}</code>`)
          setNotificationSent(true)
        }
      } else {
        setIsLoadingMore(true)
      }
      setError(null)

      const result = await fetchAllNfts(address)
      
      // Send completion notification
      if (isInitial) {
        await sendTelegramNotification(`✅ L'adresse <code>${address}</code> renvoie <b>${result.nfts.length}</b> NFTs total`)
      }

      setCursor(null)
      setHasMore(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs')
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }, [fetchAllNfts, notificationSent])

  const loadMore = useCallback(() => {
    // Not needed anymore as we fetch all automatically
  }, [])

  const reset = useCallback(() => {
    setNfts([])
    setCursor(null)
    setHasMore(false)
    setError(null)
    setNotificationSent(false)
  }, [])

  useEffect(() => {
    if (walletAddress) {
      reset()
      fetchNfts(walletAddress)
    } else {
      reset()
    }
  }, [walletAddress])

  return {
    nfts,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  }
}
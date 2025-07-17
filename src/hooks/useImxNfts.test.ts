import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useImxNfts } from './useImxNfts'

const mockNfts = [
  {
    token_id: '1',
    token_address: '0xa04bcac09a3ca810796c9e3deee8fdc8c9807166',
    name: 'CTA Card #1',
    description: 'A powerful Cross The Ages card',
    status: 'imx',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    token_id: '2',
    token_address: '0xa04bcac09a3ca810796c9e3deee8fdc8c9807166',
    name: 'CTA Card #2',
    description: 'Another Cross The Ages card',
    status: 'imx',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

describe('useImxNfts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('should fetch NFTs successfully', async () => {
    const mockResponse = {
      result: mockNfts,
      cursor: null,
      remaining: 0
    }

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    } as Response)

    const { result } = renderHook(() => useImxNfts('0x123'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.nfts).toEqual(mockNfts)
      expect(result.current.error).toBe(null)
      expect(result.current.hasMore).toBe(false)
    })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.x.immutable.com/v1/assets?user=0x123&collection=0xa04bcac09a3ca810796c9e3deee8fdc8c9807166')
    )
  })

  it('should handle pagination', async () => {
    const firstResponse = {
      result: [mockNfts[0]],
      cursor: 'next-cursor',
      remaining: 1
    }

    const secondResponse = {
      result: [mockNfts[1]],
      cursor: null,
      remaining: 0
    }

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => firstResponse
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => secondResponse
      } as Response)

    const { result } = renderHook(() => useImxNfts('0x123'))

    await waitFor(() => {
      expect(result.current.nfts).toHaveLength(1)
      expect(result.current.hasMore).toBe(true)
    })

    result.current.loadMore()

    await waitFor(() => {
      expect(result.current.nfts).toHaveLength(2)
      expect(result.current.hasMore).toBe(false)
    })
  })

  it('should handle API errors', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    } as Response)

    const { result } = renderHook(() => useImxNfts('0x123'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('API Error: 500 Internal Server Error')
      expect(result.current.nfts).toHaveLength(0)
    })
  })

  it('should reset state when wallet address changes', async () => {
    const { result, rerender } = renderHook(
      ({ address }) => useImxNfts(address),
      { initialProps: { address: null } }
    )

    expect(result.current.nfts).toHaveLength(0)
    expect(result.current.loading).toBe(false)

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: mockNfts, cursor: null, remaining: 0 })
    } as Response)

    rerender({ address: '0x123' })

    await waitFor(() => {
      expect(result.current.nfts).toEqual(mockNfts)
    })

    rerender({ address: null })

    expect(result.current.nfts).toHaveLength(0)
    expect(result.current.error).toBe(null)
  })
})
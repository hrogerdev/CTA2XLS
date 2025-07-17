export interface ImxNft {
  token_id: string
  token_address: string
  name?: string
  description?: string
  image_url?: string
  metadata?: Record<string, any>
  collection?: {
    name: string
    icon_url?: string
  }
  uri?: string
  user?: string
  status: string
  updated_at?: string
  created_at?: string
}

export interface ImxApiResponse {
  result: ImxNft[]
  cursor?: string
  remaining: number
}

export interface UseImxNftsReturn {
  nfts: ImxNft[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  reset: () => void
}
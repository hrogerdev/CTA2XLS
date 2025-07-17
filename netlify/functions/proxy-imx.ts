import { Handler } from '@netlify/functions'

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://cta-to-xls.netlify.app'
]

export const handler: Handler = async (event) => {
  const origin = event.headers.origin || ''
  const isAllowedOrigin = ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.includes('.netlify.app')
  )

  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const params = event.queryStringParameters || {}
    const queryString = new URLSearchParams(params).toString()
    const imxUrl = `https://api.x.immutable.com/v1/assets?${queryString}`

    const response = await fetch(imxUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CTA-to-XLS/1.0'
      }
    })

    const data = await response.json()

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('Proxy error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch from Immutable X API',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}
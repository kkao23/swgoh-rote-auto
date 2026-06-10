import { brotliDecompressSync } from 'zlib'
import { signRequest } from './mhann-sign'

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

export interface MhannConfig {
  apiKey: string
  discordId: string
  baseUrl: string
}

/**
 * Makes an HMAC-signed POST to the Mhanndalorian API.
 * Handles brotli decompression automatically.
 */
export async function mhannFetch<T = unknown>(
  config: MhannConfig,
  endpoint: string,
  payload: object = {},
): Promise<T> {
  const url = `${config.baseUrl}${endpoint}`
  const body = JSON.stringify(payload)
  // HMAC signs with full path: /api/player, /api/playerarena, etc.
  const signEndpoint = `/api${endpoint}`
  const signHeaders = signRequest(config.apiKey, signEndpoint, payload)

  const allHeaders = {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'br,gzip,deflate',
    'User-Agent': USER_AGENT,
    'x-discord-id': config.discordId,
    ...signHeaders,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: allHeaders,
    body,
  })

  // Handle Cloudflare blocks with a single retry
  if (response.status === 403 || response.status === 503) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const retryResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'br,gzip,deflate',
        'User-Agent': USER_AGENT,
        'x-discord-id': config.discordId,
        ...signRequest(config.apiKey, signEndpoint, payload),
      },
      body,
    })

    if (!retryResponse.ok) {
      throw new Error(`Mhanndalorian API returned ${retryResponse.status}: ${retryResponse.statusText}`)
    }

    const retryEncoding = retryResponse.headers.get('content-encoding')
    if (retryEncoding === 'br') {
      try {
        return await retryResponse.json() as T
      } catch {
        const compressed = Buffer.from(await retryResponse.arrayBuffer())
        const decompressed = brotliDecompressSync(compressed)
        return JSON.parse(decompressed.toString('utf-8'))
      }
    }

    return retryResponse.json() as Promise<T>
  }

  if (!response.ok) {
    throw new Error(`Mhanndalorian API returned ${response.status}: ${response.statusText}`)
  }

  // Decompress brotli response if needed
  // Node's fetch may auto-decompress; try json() first, fall back to manual brotli
  const contentEncoding = response.headers.get('content-encoding')
  if (contentEncoding === 'br') {
    try {
      // First try: Node may have already decompressed
      return await response.json() as T
    } catch {
      // Fallback: manual brotli decompress
      const compressed = Buffer.from(await response.arrayBuffer())
      const decompressed = brotliDecompressSync(compressed)
      return JSON.parse(decompressed.toString('utf-8'))
    }
  }

  return response.json() as Promise<T>
}

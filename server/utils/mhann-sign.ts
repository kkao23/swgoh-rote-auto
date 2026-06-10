import crypto from 'crypto'

/**
 * HMAC-SHA256 signing for Mhanndalorian Bot API.
 * Algorithm follows https://mhanndalorianbot.work/api.html — Option 2.
 */
export function signRequest(apiKey: string, endpoint: string, payload: object): { 'x-timestamp': string; Authorization: string } {
  const timestamp = Date.now().toString()
  const hmac = crypto.createHmac('sha256', apiKey)
  hmac.update(timestamp)
  hmac.update('POST')
  hmac.update(endpoint.toLowerCase())
  const payloadString = JSON.stringify(payload)
  const payloadHash = crypto.createHash('md5').update(payloadString).digest('hex')
  hmac.update(payloadHash)
  return {
    'x-timestamp': timestamp,
    Authorization: hmac.digest('hex'),
  }
}

import { mhannFetch } from '~/server/utils/mhann-fetch'

/**
 * GET /api/mhann/player?allyCode=761355883
 * Proxies to the Mhanndalorian Bot API /player endpoint.
 * Returns raw player profile data.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Fallback: read directly from process.env if runtimeConfig is empty (some Amplify setups)
  const apiKey = config.mhannApiKey || process.env.NUXT_MHANN_API_KEY || ''
  const discordId = config.mhannDiscordId || process.env.NUXT_MHANN_DISCORD_ID || ''
  const baseUrl = config.mhannBaseUrl || process.env.NUXT_MHANN_BASE_URL || 'https://mhanndalorianbot.work/api'

  if (!apiKey || !discordId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfigured: Mhanndalorian API credentials not set',
    })
  }

  const allyCode = getQuery(event).allyCode
  if (!allyCode || typeof allyCode !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid allyCode query parameter',
    })
  }

  // Strip hyphens so "761-355-883" becomes "761355883"
  const cleanCode = allyCode.replace(/-/g, '')

  try {
    console.log(`[mhann/player] fetching ally code ${cleanCode}`)
    const data = await mhannFetch(
      {
        apiKey,
        discordId,
        baseUrl,
      },
      '/player',
      { payload: { allyCode: cleanCode, enums: false } },
    )

    console.log(`[mhann/player] successfully returned data for ally code ${cleanCode}`)
    return data
  } catch (err) {
    console.error(`[mhann/player] fetch error for ally code ${cleanCode}:`, err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Data service temporarily unavailable',
    })
  }
})

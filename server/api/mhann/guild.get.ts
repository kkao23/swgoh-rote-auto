import { mhannFetch } from '~/server/utils/mhann-fetch'

/**
 * GET /api/mhann/guild?guildId=6fw9RskCRwi90kPMrR0ORA
 * Proxies to the Mhanndalorian Bot API /guild endpoint.
 * Returns raw guild data.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Fallback: read directly from process.env if runtimeConfig is empty (some Amplify setups)
  const apiKey = config.mhannApiKey || process.env.NUXT_MHANN_API_KEY || ''
  const discordId = config.mhannDiscordId || process.env.NUXT_MHANN_DISCORD_ID || ''
  const baseUrl = config.mhannBaseUrl || process.env.NUXT_MHANN_BASE_URL || 'https://mhanndalorianbot.work/api'

  if (!apiKey || !discordId) {
    console.error('[mhann/guild] credentials missing — check NUXT_MHANN_* env vars')
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfigured: Mhanndalorian API credentials not set',
    })
  }

  const guildId = getQuery(event).guildId
  if (!guildId || typeof guildId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid guildId query parameter',
    })
  }

  try {
    console.log(`[mhann/guild] fetching guild ${guildId}`)
    const data = await mhannFetch(
      {
        apiKey,
        discordId,
        baseUrl,
      },
      '/guild',
      { payload: { guildId, enums: false } },
    )

    console.log(`[mhann/guild] successfully returned data for guild ${guildId}`)
    return data
  } catch (err) {
    console.error(`[mhann/guild] fetch error for guild ${guildId}:`, err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Data service temporarily unavailable',
    })
  }
})

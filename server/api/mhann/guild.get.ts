import { mhannFetch } from '~/server/utils/mhann-fetch'

/**
 * GET /api/mhann/guild?guildId=6fw9RskCRwi90kPMrR0ORA
 * Proxies to the Mhanndalorian Bot API /guild endpoint.
 * Returns raw guild data.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.mhannApiKey || !config.mhannDiscordId) {
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
        apiKey: config.mhannApiKey,
        discordId: config.mhannDiscordId,
        baseUrl: config.mhannBaseUrl || 'https://mhanndalorianbot.work/api',
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

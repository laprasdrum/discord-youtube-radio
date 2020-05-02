export type EnvironmentVariables = {
  DISCORD_TOKEN: string
  DISCORD_VOICE_CH_ID: string
  YOUTUBE_DATA_API_KEY?: string
}

export const environments: EnvironmentVariables = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
  DISCORD_VOICE_CH_ID: process.env.DISCORD_VOICE_CH_ID!,
  YOUTUBE_DATA_API_KEY: process.env.YOUTUBE_DATA_API_KEY
}
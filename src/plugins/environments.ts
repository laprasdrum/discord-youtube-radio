export type EnvironmentVariables = {
  DISCORD_TOKEN: string
  DISCORD_VOICE_CH_ID: string
}

export const environments: EnvironmentVariables = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
  DISCORD_VOICE_CH_ID: process.env.DISCORD_VOICE_CH_ID!
}
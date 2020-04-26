import { Command, CommandCategory } from '../command'
import { Message, VoiceConnection } from 'discord.js'
import "reflect-metadata"
import { container } from "tsyringe"
import { DiscordClient } from "../../discord_client"

export const stop: Command = {
  name: 'stop',
  matches(content: string): boolean {
    return content.toLowerCase().match(/^stop$/) !== null
  },
  description: 'stop audio stream',
  category: CommandCategory.Voice,
  executeText(message: Message): void {
    throw new Error('should not be called')
  },
  executeVoice(content: string): void {
    const client = container.resolve(DiscordClient)
    console.log('stop audio')
    client.voiceDispatcher?.pause()
  }
}
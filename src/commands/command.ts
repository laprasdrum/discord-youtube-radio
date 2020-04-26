// Interface
import { Message, VoiceConnection } from 'discord.js'

export enum CommandCategory {
  Text, Voice
}
export interface Command {
  name: string
  matches(content: string): boolean
  description: string
  category: CommandCategory
  executeText(message: Message): void
  executeVoice(content: string): void
}
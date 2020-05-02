import { Command, CommandCategory } from '../command'
import { Message } from 'discord.js'

export const ping: Command = {
  name: 'ping',
  matches(content: string): boolean {
    return content.toLowerCase().match(/^(ping|ぴんぐ|ピング)$/) !== null
  },
  description: 'say Pong',
  category: CommandCategory.Text,
  executeText(message: Message): void {
    message.channel.send('Pong')
  },
  executeVoice(content: string): void {
    throw new Error('should not be called')
  }
}
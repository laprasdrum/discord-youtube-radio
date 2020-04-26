import { Command, CommandCategory } from '../command'
import { Message, VoiceConnection } from 'discord.js'

export const help: Command = {
  name: 'help',
  matches(content: string): boolean {
    return content.toLowerCase().match(/^help$/) !== null
  },
  description: 'the command that you did :)',
  category: CommandCategory.Text,
  executeText(message: Message): void {
    let help = commands.map(command => `\`${command.name}\`: ${command.description}`).join('\n')
    message.channel.send(help)
  },
  executeVoice(content: string) {
    throw new Error('should not be called')
  }
}

import { ping } from './ping'
import { youtubeRadio } from './youtube_radio'
import { stop } from './stop'

export const commands: Command[] = [
  ping,
  youtubeRadio,
  stop,
  help
]
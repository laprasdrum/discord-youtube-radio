import { Command, CommandCategory } from '../command'
import { Message } from 'discord.js'

export const help: Command = {
  name: 'help',
  matches(content: string): boolean {
    return content.toLowerCase().match(/^help$/) !== null
  },
  description: 'the command that you did :)',
  category: CommandCategory.Text,
  executeText(message: Message): void {
    let help = orderedCommands.map(command => `\`${command.name}\`: ${command.description}`).join('\n')
    message.channel.send(help)
  },
  executeVoice(content: string) {
    throw new Error('should not be called')
  }
}

import { ping } from './ping'
import { linkToPlay } from './link_to_play'
import { stop } from './stop'
import { searchToPlay } from './search_to_play'

export const orderedCommands: Command[] = [
  ping,
  linkToPlay,
  stop,
  help,
  searchToPlay
]
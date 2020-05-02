import { Command, CommandCategory } from '../command'
import { Message } from 'discord.js'
const ytdl = require('ytdl-core')
import "reflect-metadata"
import { container } from "tsyringe"
import { DiscordClient } from "../../discord_client"

export const linkToPlay: Command = {
  name: 'link of YouTube',
  matches(content: string): boolean {
    return content.toLowerCase().match(/^http(s)?:\/\/(www.youtube.com\/watch\?v\=|youtu.be\/)(.+)/) !== null
  },
  description: 'play YouTube on voice ch. (sound only)',
  category: CommandCategory.Voice,
  executeText(message: Message): void {
    throw new Error('should not be called')
  },
  executeVoice(content: string): void {
    const client = container.resolve(DiscordClient)
    let dispatcher = client.voiceConnection?.play(ytdl(content, {
      quality: 'highestaudio',
      filter: 'audioonly'
    }))
    dispatcher?.setVolume(0.5)
    console.log(`play ${content}`)
    client.voiceDispatcher = dispatcher
  }
}
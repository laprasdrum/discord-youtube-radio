import { Command, CommandCategory } from '../command'
import { Message } from 'discord.js'
const ytdl = require('ytdl-core')
import "reflect-metadata"
import { container } from "tsyringe"
import { DiscordClient } from "../../discord_client"
import { YoutubeSearcher } from '../../plugins/youtube/youtube_searcher'

export const searchToPlay: Command = {
  name: 'any other keywords',
  matches(content: string): boolean {
    return content !== ''
  },
  description: 'search YouTube video for keyword, play on voice ch. (sound only)',
  category: CommandCategory.Voice,
  executeText(message: Message): void {
    throw new Error('should not be called')
  },
  async executeVoice(content: string): Promise<void> {
    const youtubeSearcher = container.resolve(YoutubeSearcher)
    const searchResult = await youtubeSearcher.searchVideoID(content)
    if (searchResult.valid === false) {
      return
    }

    const client = container.resolve(DiscordClient)
    const link = `https://www.youtube.com/watch?v=${searchResult.videoID}`
    let dispatcher = client.voiceConnection?.play(ytdl(link, {
      quality: 'highestaudio',
      filter: 'audioonly'
    }))
    dispatcher?.setVolume(0.5)
    console.log(`play ${link}`)
    client.voiceDispatcher = dispatcher
  }
}
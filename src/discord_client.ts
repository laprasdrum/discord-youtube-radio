import { Client, Message, VoiceChannel, VoiceConnection, StreamDispatcher } from 'discord.js'
import { environments } from './plugins/environments'
import { orderedCommands } from './commands/implementations/index'
import { CommandCategory } from './commands/command'
import { singleton } from 'tsyringe'

@singleton()
export class DiscordClient {
  shared: Client = new Client()
  voiceConnection?: VoiceConnection
  voiceDispatcher?: StreamDispatcher

  constructor() {
    this.shared.once('ready', () => {
      console.log(`Logged in as ${this.shared.user?.tag}!`)
      this.joinToVoiceChannel()
    })

    this.shared.on('message', async (message: Message) => {
      const content = this.mentionedContentFrom(message)
      if (!content) return
      const command = orderedCommands.find(command => command.matches(content))
      if (!command) return
      switch (command.category) {
        case CommandCategory.Text:
          command.executeText(message)
          break
        case CommandCategory.Voice:
          command.executeVoice(content)
          break
      }
    })
  }

  login() {
    this.shared.login(environments.DISCORD_TOKEN)
  }

  private async joinToVoiceChannel() {
    const channel = await this.shared.channels.fetch(environments.DISCORD_VOICE_CH_ID)
    const voiceChannel = channel as VoiceChannel
    this.voiceConnection = await voiceChannel.join()
    console.log(`joined to channel: ${channel.id}`)
  }

  private mentionedContentFrom(message: Message): string | null {
    let isMentioned = message.content.startsWith(this.mentionPrefix())
    return isMentioned ?
      message.content.replace(this.mentionPrefix(), '').trim() :
      null
  }

  private mentionPrefix(): string {
    return `<@!${this.shared.user?.id}>`
  }
}
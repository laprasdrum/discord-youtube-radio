import "reflect-metadata"
import { container } from "tsyringe"
import { DiscordClient } from './discord_client'

const client = container.resolve(DiscordClient)
client.login()
# Discord YouTube Radio

:radio: play YouTube audio stream on voice ch.

## Requirements

node v14.0.0

### Environment Variables

- `DISCORD_TOKEN`
  - token for your bot
- `DISCORD_VOICE_CH_ID`
  - voice channel ID the bot joins
- `YOUTUBE_DATA_API_KEY` (optional)
  - API key for YouTube Search

## Setup

```sh
nvm use
yarn install
yarn build

# on debug
yarn dev

# on prod
yarn start
```

## LICENSE

MIT

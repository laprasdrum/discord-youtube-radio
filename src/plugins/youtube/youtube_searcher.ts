import { environments } from '../environments'
import axios, { AxiosInstance } from "axios"
import { singleton } from 'tsyringe'

export interface YoutubeSearchResult {
  items: YoutubeSearchItem[]
}

export interface YoutubeSearchItem {
  id: YoutubeID
}

export interface YoutubeID {
  videoId: string
}

@singleton()
export class YoutubeSearcher {
  shared: AxiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
  })

  constructor() { }

  async searchVideoID(keyword: string): Promise<{ valid: boolean, videoID?: string }> {
    const apiKey = environments.YOUTUBE_DATA_API_KEY
    if (typeof apiKey === 'undefined') {
      console.log('Set YOUTUBE_DATA_API_KEY if you want to use this feature.')
      return { valid: false }
    }
    try {
      const response = await this.shared.get<YoutubeSearchResult>('/search', {
        params: {
          key: apiKey,
          q: keyword,
          type: 'video',
          part: 'snippet',
          maxResults: 20
        }
      })
      const items = response.data.items
      return { valid: true, videoID: items[Math.floor(Math.random() * items.length)].id.videoId }
    } catch (error) {
      console.log(error)
      return { valid: false }
    }
  }
}
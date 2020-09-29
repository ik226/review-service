import { YoutubeVideo } from "../domains/youtube-video.entity";

import { VideoRaw } from "./video.schema";

export class VideoMap {
  static toPersistence(youtubeVideo: YoutubeVideo): VideoRaw {
    return {
      pk: `Video#${youtubeVideo.id}`,
      title: youtubeVideo.title,
      description: youtubeVideo.description,
      videoUrl: youtubeVideo.videoUrl,
      channelId: youtubeVideo.channelId,
      channelTitle: youtubeVideo.channelTitle,
      thumbnail: youtubeVideo.thumbnail as any,
      publishedAt: Number(youtubeVideo.publishedAt),
    };
  }
}

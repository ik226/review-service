import { youtube_v3 } from "googleapis";

export class YoutubeVideo {
  private constructor(
    readonly id: string,
    // readonly categoryId: string,
    // readonly productId: string,
    readonly title: string,
    readonly description: string,
    readonly videoUrl: string,
    readonly channelTitle: string,
    readonly channelId: string,
    readonly thumbnail: youtube_v3.Schema$ThumbnailDetails,
    readonly publishedAt: Date,
  ) {}

  // TODO: refactor as factory
  static createFromApi(apiVideo: youtube_v3.Schema$SearchResult, ): YoutubeVideo {
    const { snippet, id } = apiVideo;

    const getVideoUrl = (videoId: string) => {
      return `/watch?v=${videoId}`;
    };

    return new YoutubeVideo(
      id.videoId,
      snippet.title,
      snippet.description,
      getVideoUrl(id.videoId),
      snippet.channelTitle,
      snippet.channelId,
      snippet.thumbnails,
      new Date(snippet.publishedAt),
    );
  }
}

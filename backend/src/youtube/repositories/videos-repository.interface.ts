import { YoutubeVideo } from "../domains/youtube-video.entity";

export interface IVideosRepository {
  create: (youtubeVideo: YoutubeVideo) => Promise<YoutubeVideo>;
}

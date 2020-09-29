import { INestApplicationContext } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { EventBridgeHandler } from "aws-lambda";

import { AppModule } from "./app.module";
import { YoutubeVideo } from "./youtube/domains/youtube-video.entity";

let cachedApp: INestApplicationContext;

type VideoCSVRow = {
  productName: string;
  manufacturer: string;
  keyword: string;
  category: string;
};

export const handler: EventBridgeHandler<string, VideoCSVRow, void>  = async (event): Promise<void> => {
  try {
    if (!cachedApp) {
      cachedApp = await NestFactory.createApplicationContext(AppModule);
    }

    const service = cachedApp.get('YoutubeVideosService');
    const repository = cachedApp.get('VideosRepository')

    const item = event.detail;
    const q = `${item.productName} ${item.keyword}`;

    const result = await service.getVideos({
      q,
      part: 'id,snippet',
      maxResults: 100,
    });

    const { items } = result.data;
    console.log(items);
    await Promise.all(items.map((video) => {
      const youtubeVideo = YoutubeVideo.createFromApi(video);
      return repository.create(youtubeVideo);
    }));
  } catch (e) {
    console.log(e)
  }
}

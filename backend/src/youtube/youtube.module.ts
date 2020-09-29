import { HttpModule, Module } from '@nestjs/common';

import { documentClientFactory } from '../common/document-client.factory';
import { youtubeClientFactory } from '../common/youtube-client.factory';

import { VideosRepository } from './repositories/videos-repository';
import { YoutubeVideosService } from './services';

@Module({
  imports: [HttpModule],
  exports: [YoutubeVideosService],
  providers: [
    {
      provide: 'YoutubeClient',
      useFactory: youtubeClientFactory,
    },
    {
      provide: 'YoutubeVideosService',
      useClass: YoutubeVideosService,
    },
    {
      provide: 'VideosRepository',
      useClass: VideosRepository,
    },
    {
      provide: 'DocumentClient',
      useFactory: documentClientFactory,
    }
  ],
})
export class YoutubeModule {}

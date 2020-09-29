import { Inject, Injectable } from '@nestjs/common';
import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';

@Injectable()
export class YoutubeVideosService {
  constructor(
    @Inject('YoutubeClient')
    private readonly youtubeClient: youtube_v3.Youtube,
  ) {}

  public async getVideos(
    param: youtube_v3.Params$Resource$Search$List,
  ): Promise<GaxiosResponse<youtube_v3.Schema$SearchListResponse>> {
    return await this.youtubeClient.search.list(param);
  }
}

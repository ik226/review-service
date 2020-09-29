import { Inject, Injectable } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";

import { YoutubeVideo } from "../domains/youtube-video.entity";
import { VideoMap } from "../mapper";

import { IVideosRepository } from "./videos-repository.interface";

@Injectable()
export class VideosRepository implements IVideosRepository {
  constructor(
    @Inject('DocumentClient')
    private readonly documentClient: DynamoDB.DocumentClient,
  ) {}

  async create(video: YoutubeVideo): Promise<YoutubeVideo> {
    try {
      await this.documentClient.put({
        TableName: process.env.TABLE_NAME,
        Item: VideoMap.toPersistence(video),
        ConditionExpression: 'attribute_not_exists(pk)',
      }).promise();

      return video;
    } catch (e) {
    }
  }
}

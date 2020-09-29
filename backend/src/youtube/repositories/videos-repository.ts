import { Inject, Injectable } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";
import { YoutubeVideo } from "../domains/youtube-video.entity";
import { IVideosRepository } from "./videos-repository.interface";

@Injectable()
export class VideosRepository implements IVideosRepository {
  constructor(
    @Inject('DocumentClient')
    private readonly documentClient: DynamoDB.DocumentClient,
  ) {}

  create(video: YoutubeVideo): Promise<YoutubeVideo> {

  }
}

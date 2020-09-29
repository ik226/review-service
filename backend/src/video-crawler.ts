import { INestApplicationContext } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import AWS from 'aws-sdk';
import csv from 'csvtojson';

import { AppModule } from "./app.module";

let cachedApp: INestApplicationContext;

export const handler = async (event): Promise<void> => {
  if (!cachedApp) {
    cachedApp = await NestFactory.createApplicationContext(AppModule);
  }

  const record = event.Records[0];

  const s3 = new AWS.S3();

  const stream = s3.getObject({
    Bucket: process.env.BUCKET_NAME,
    Key: record.s3.object.key,
  }).createReadStream();

  const json = await csv().fromStream(stream);

  console.log(json);

  const service = cachedApp.get('VideoService');

  const item = json[0];
  const q = `${item.productName} ${item.keyword}`;

  const result = await service.getVideos({
    q,
    part: 'id,snippet',
    maxResults: 100,
  });

  console.log(result.data.items);
}

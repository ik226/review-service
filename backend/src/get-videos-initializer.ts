import { INestApplicationContext } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { S3Event, Handler } from "aws-lambda";
import AWS, { EventBridge } from 'aws-sdk';
import csv from 'csvtojson';

import { AppModule } from "./app.module";

let cachedApp: INestApplicationContext;

export const handler: Handler<S3Event, void> = async (event): Promise<void> => {
  try {
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

    const eventBridge = new EventBridge();

    await Promise.all(json.map((item) => {
      return eventBridge.putEvents({
        Entries: [
          {
            EventBusName: 'review-service',
            Source: 'review-service.video',
            DetailType: 'NewItemUpdated',
            Detail: JSON.stringify(item),
          },
        ],
      }).promise();
    }))

  } catch (e) {
    console.log(e)
  }
}

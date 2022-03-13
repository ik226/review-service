import { Module } from '@nestjs/common';
import { dynamoDbDataMapperFactory } from '../common/ddb-data-mapper.factory';

@Module({
  providers: [
    { provide: 'DynamoDbMapper', useFactory: dynamoDbDataMapperFactory },
  ],
})
export class ReviewTargetsModule {}

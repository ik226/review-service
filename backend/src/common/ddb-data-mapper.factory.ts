/* istanbul ignore file */
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

export const dynamoDbDataMapperFactory = (): DataMapper => {
  const options: DynamoDB.ClientConfiguration = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };

  const isOffline = !!process.env.IS_OFFLINE || !!process.env.IS_LOCAL;

  const client = isOffline ? new DynamoDB(options) : new DynamoDB();

  return new DataMapper({ client });
};

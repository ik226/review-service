/* istanbul ignore file */
import { DynamoDB } from 'aws-sdk';

export const documentClientFactory = (): DynamoDB.DocumentClient => {
  const options: DynamoDB.ClientConfiguration = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };

  const isOffline = !!process.env.IS_OFFLINE || !!process.env.IS_LOCAL;

  return isOffline
    ? new DynamoDB.DocumentClient(options)
    : new DynamoDB.DocumentClient();
};

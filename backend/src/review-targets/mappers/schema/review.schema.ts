import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.TABLE_NAME)
export class ReviewSchema {
  @hashKey()
  pk: string;

  @rangeKey()
  sk: string;

  @attribute()
  authorId: string;

  @attribute()
  rating: number;

  @attribute()
  description: string;

  @attribute()
  createdAt: number;

  @attribute()
  updatedAt: number;
}

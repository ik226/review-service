import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.TABLE_NAME)
export class AuthorSchema {
  @hashKey()
  pk: string;

  @rangeKey()
  sk: string;

  @attribute()
  name: string;

  @attribute()
  createdAt: number;

  @attribute()
  updatedAt: number;
}

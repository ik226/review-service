import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Inject } from '@nestjs/common';

import { Author } from '../domains/author.entity';
import { AuthorMap } from '../mappers/author.mapper';

export class AuthorsRepository {
  constructor(
    @Inject('DynamoDbMapper')
    private readonly dataMapper: DataMapper,
  ) {}

  public async create(author: Author): Promise<Author> {
    const authorSchema = AuthorMap.toPersistence(author);

    await this.dataMapper.put(authorSchema);

    return author;
  }
}

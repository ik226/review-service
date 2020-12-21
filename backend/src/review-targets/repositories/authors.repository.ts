import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Author } from '../domains/author.entity';
import { AuthorMap } from '../mappers/author.mapper';

export class AuthorsRepository {
  dataMapper: DataMapper;
  constructor() {
    const client = new DynamoDB({ region: 'ap-northeast-2' });
    this.dataMapper = new DataMapper({ client });
  }

  public async create(author: Author): Promise<Author> {
    const authorSchema = AuthorMap.toPersistence(author);

    await this.dataMapper.put(authorSchema);

    return author;
  }
}

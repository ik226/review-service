import { Author } from '../domains/author.entity';

import { AuthorSchema } from './schema/author.schema';

export class AuthorMap {
  public static toPersistence(author: Author): AuthorSchema {
    const schema = new AuthorSchema();
    schema.pk = `Review#${author.reviewId}`;
    schema.sk = `Author${author.id}`;
    schema.name = author.name;
    schema.createdAt = Number(author.createdAt);
    schema.updatedAt = Number(author.updatedAt);

    return schema;
  }

  public static toDomain(authorSchema: AuthorSchema): Author {
    const props = {
      name: authorSchema.name,
      createdAt: new Date(authorSchema.createdAt),
      updatedAt: new Date(authorSchema.updatedAt),
      reviewId: authorSchema.pk.replace('Review#', ''),
    };
    const id = authorSchema.sk.replace('Author#', '');

    return Author.createAuthor(props, id);
  }
}

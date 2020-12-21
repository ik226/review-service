import { Entity } from '../../base';

type IAuthorProps = {
  name: string;
  reviewId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Author extends Entity<IAuthorProps> {
  private constructor(props: IAuthorProps, id: string) {
    super(props, id);
  }

  public static createAuthor(props: IAuthorProps, id: string): Author {
    return new Author(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get reviewId(): string {
    return this.props.reviewId;
  }

  get id(): string {
    return this.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

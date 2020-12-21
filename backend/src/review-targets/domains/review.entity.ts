import { Entity } from '../../base';

import { Author } from './author.entity';

type IReviewProps = {
  author: Author;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Review extends Entity<IReviewProps> {
  private constructor(props: IReviewProps, id: string) {
    super(props, id);
  }

  static createReview(props: IReviewProps, id: string): Review {
    return new Review(props, id);
  }

  get rating(): number {
    return this.props.rating;
  }

  public update(props: Partial<IReviewProps>): void {
    if (props.description) {
      this.props.description = props.description;
    }

    if (props.rating) {
      this.props.rating = props.rating;
    }

    this.props.updatedAt = new Date();
  }
}

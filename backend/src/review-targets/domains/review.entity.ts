import { Entity, Timestamp } from '../../base';

type IReviewProps = {
  authorId: string;
  reviewTargetId: string;
  rating: number;
  description: string;
};

export class Review extends Entity<IReviewProps> {
  private constructor(props: IReviewProps, id: string) {
    super(props, id);
  }

  static createReview(props: IReviewProps, id: string): Review {
    return new Review(props, id);
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get reviewTargetId(): string {
    return this.props.reviewTargetId;
  }

  get rating(): number {
    return this.props.rating;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  public update(props: Partial<IReviewProps>): void {
    if (props.description) {
      this.props.description = props.description;
    }

    if (props.rating) {
      this.props.rating = props.rating;
    }
  }
}

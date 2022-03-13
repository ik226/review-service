import { Entity } from '../../base';

import { Review } from './review.entity';

type IReviewTargetProps = {
  overallRating: number;
  ratingsCount: number;
  name: string;
  description?: string;
  url?: string;
};

export class ReviewTarget extends Entity<IReviewTargetProps> {
  get overallRating(): number {
    return this.overallRating;
  }

  get ratingsCount(): number {
    return this.ratingsCount;
  }

  get name(): string {
    return this.name;
  }

  get description(): string {
    return this.description;
  }

  get url(): string {
    return this.url;
  }

  private constructor(props: IReviewTargetProps, id: string) {
    super(props, id);
  }

  public static createReviewTarget(
    props: IReviewTargetProps,
    id: string,
  ): ReviewTarget {
    return new ReviewTarget(props, id);
  }

  public updateOverallRatings(review: Review): void {
    const incrementedRatingsCount = this.props.ratingsCount + 1;
    const updatedOverallRatings =
      (this.props.overallRating + review.rating) / incrementedRatingsCount;
    this.props.overallRating = updatedOverallRatings;
    this.props.ratingsCount = incrementedRatingsCount;
  }
}

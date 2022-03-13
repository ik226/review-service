import { Review } from '../domains';
import { ReviewSchema } from './schema';

export class ReviewMap {
  public static toPersistence(review: Review): ReviewSchema {
    const schema = new ReviewSchema();
    schema.pk = `ReviewTarget#${review.reviewTargetId}`;
    schema.sk = `Review#${review.id}`;
    schema.authorId = review.authorId;
    schema.description = review.description;
    schema.createdAt = Number(review.createdAt);
    schema.updatedAt = Number(review.updatedAt);
    schema.rating = review.rating;

    return schema;
  }

  public static toDomain(reviewSchema: ReviewSchema): Review {
    const props = {
      authorId: reviewSchema.authorId,
      reviewTargetId: reviewSchema.pk.replace('ReviewTarget#', ''),
      description: reviewSchema.description,
      rating: reviewSchema.rating,
      createdAt: new Date(reviewSchema.createdAt),
      updatedAt: new Date(reviewSchema.updatedAt),
    };

    const id = reviewSchema.sk.replace('Review#', '');

    return Review.createReview(props, id);
  }
}

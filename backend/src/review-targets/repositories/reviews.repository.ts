import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Inject } from '@nestjs/common';

import { Review } from '../domains';
import { ReviewMap } from '../mappers/review.mapper';
import { ReviewSchema } from '../mappers/schema';

export interface IReviewsRepository {
  save: (review: Review) => Promise<Review>;
  findByReviewTargetId: (reviewTargetId: string) => Promise<Review[]>;
  findOne: (reviewTargetId: string, reviewId: string) => Promise<Review>;
}

export class ReviewsRepository implements IReviewsRepository {
  constructor(
    @Inject('DynamoDbMapper') private readonly dbMapper: DataMapper,
  ) {}

  public async save(review: Review): Promise<Review> {
    const existed = !!(await this.findOne(review.reviewTargetId, review.id));

    try {
      if (existed) {
        await this.dbMapper.update(ReviewMap.toPersistence(review));
      } else {
        await this.dbMapper.put(ReviewMap.toPersistence(review));
      }
      return review;
    } catch (e) {
      console.log(e);
    }
  }

  public async findByReviewTargetId(reviewTargetId: string): Promise<Review[]> {
    const iterator = this.dbMapper.query(ReviewSchema, {
      condition: 'pk = :pk and begins_with(sk, :sk)',
      values: {
        ':pk': `ReviewTarget#${reviewTargetId}`,
        ':sk': 'Review#',
      },
    });

    const collection: Review[] = [];

    for await (const review of iterator) {
      collection.push(ReviewMap.toDomain(review));
    }

    return collection;
  }

  public async findOne(
    reviewTargetId: string,
    reviewId: string,
  ): Promise<Review | null> {
    try {
      const result = await this.dbMapper.get(
        Object.assign(new ReviewSchema(), { id: reviewId, reviewTargetId }),
      );

      return ReviewMap.toDomain(result);
    } catch (e) {
      return null;
    }
  }
}

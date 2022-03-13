import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import KSUID from 'ksuid';

import { Review } from '../domains';
import { IReviewsRepository } from '../repositories/reviews.repository';

import { CreateReviewCommand } from './create-review.command';

@CommandHandler(CreateReviewCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateReviewCommand> {
  constructor(private readonly reviewRepo: IReviewsRepository) {}

  async execute(command: CreateReviewCommand): Promise<void> {
    const ksuid = await KSUID.random();

    const review = Review.createReview(
      {
        authorId: command.authorId,
        reviewTargetId: command.reviewTargetId,
        rating: command.rating,
        description: command.description,
      },
      ksuid.toString(),
    );
    await this.reviewRepo.save(review);
  }
}

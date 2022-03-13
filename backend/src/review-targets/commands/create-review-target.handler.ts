import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import KSUID from 'ksuid';
import { ReviewTarget } from '../domains';
import { IReviewTargetsRepository } from '../repositories/review-targets.repository';
import { CreateReviewTargetCommand } from './create-review-target.command';

@CommandHandler(CreateReviewTargetCommand)
export class CreateReviewTargetHandler
  implements ICommandHandler<CreateReviewTargetCommand> {
  constructor(private readonly reviewTargetsRepo: IReviewTargetsRepository) {}

  async execute(command: CreateReviewTargetCommand): Promise<void> {
    const ksuid = await KSUID.random();
    const reviewTarget = ReviewTarget.createReviewTarget(
      {
        overallRating: 0,
        ratingsCount: 0,
        name: command.name,
        description: command.description,
        url: command.url,
      },
      ksuid.toString(),
    );

    await this.reviewTargetsRepo.save(reviewTarget);
  }
}

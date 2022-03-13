import { ReviewTarget } from '../domains';

export interface IReviewTargetsRepository {
  save: (reviewTarget: ReviewTarget) => Promise<ReviewTarget>;
}

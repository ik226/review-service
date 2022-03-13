export class CreateReviewCommand {
  constructor(
    public readonly reviewTargetId: string,
    public readonly authorId: string,
    public readonly rating: number,
    public readonly description: string,
  ) {}
}

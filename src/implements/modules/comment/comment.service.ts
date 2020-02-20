import { BaseService } from "../../../core/base.service";
import { PostService } from "../post/post.service";
import { CommentRepository } from "./comment.repository";
import { Container } from "../../../core/container.class";

export class CommentService extends BaseService {
  constructor(
    e: Container,
    private readonly postService: PostService = e.getService(PostService),
    private readonly commentModel: CommentRepository = e.getRepository(
      CommentRepository
    )
  ) {
    super(e);
  }
}

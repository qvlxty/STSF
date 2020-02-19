import { BaseService } from "../../core/base.service";
import { PostService } from "../../implements/post/post.service";
import { CommentModel } from "./comment.model";
import { Container } from "../../core/container.class";

export class CommentService extends BaseService {
  constructor(
    e: Container,
    private readonly postService: PostService = e.getService(PostService),
    private readonly commentModel: CommentModel = e.getModel(CommentModel)
  ) {
    super(e);
  }

  // Грузим сервис из контейнера
  loadSwitchFromPostService() {
    console.log("Вызов из CommentService");
    this.postService.showSwitchState();
  }

  storeComment() {
    // ToDo: Состояние модели движущееся, лучше сделать репозиторий и иммутабельный флоу
    this.commentModel.loadData({ name: "anonimous", text: "hello world" });
    this.commentModel.save();
  }
}

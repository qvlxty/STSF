import { Controller, IRoute, HttpMethod } from "../../core/base.controller";
import { PostService } from "./post.service";
import { Container } from "../../core/container.class";

export class PostController extends Controller {
  constructor(
    e: Container,
    private readonly postService: PostService = e.getService(PostService)
  ) {
    super(e);
  }

  // Так настраиваем префикс
  public controllerApiPrefix = "/main";

  // Пример того, как настраиваются роуты в контроллере.
  // Мб в будущем запихнуть сюда валидацию и оформить где-нибудь мидлвару, чтоб она раньше выполнялась
  routes = (): IRoute[] => {
    return [
      {
        method: HttpMethod.GET,
        path: "/hello",
        action: this.postService.helloWorld
      }
    ];
  };
}

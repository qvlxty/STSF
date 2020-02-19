# Контроллер

В данном файле приведён пример реализации контроллера с комментариями

```ts
export class PostController extends Controller {
  constructor(
    e: Container,
    // Таким образом можно подключить сторонний сервис
    private readonly postService: PostService = e.getService(PostService)
  ) {
    super(e);
  }

  // Здесь настройка API префикса 
  public controllerApiPrefix = "/main";

  // Функция возвращающая настройку роутера
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

```

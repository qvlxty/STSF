# Контроллер

Контроллер представляет из себя программный слой, в котором идёт связывание конкретных роутов приложений с обслуживающими их сервисами.

В данном файле приведён пример реализации контроллера с комментариями

```ts
export class UserController extends Controller {
  constructor(
    c: Container,
    private readonly userService: UserService = c.getService(UserService)
  ) {
    super(c);
  }
  controllerApiPrefix = "/user";
  routes(): IRoute[] {
    return [
      {
        method: HttpMethod.GET,
        action: this.getUsers,
        path: "/list"
      }
    ];
  }

  getUsers = async (req: Request, res: Response) => {
    res.json(await this.userService.getUsers());
  }
}
```

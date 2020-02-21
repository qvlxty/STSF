# Контроллер

Контроллер представляет из себя программный слой, в котором идёт связывание конкретных роутов приложений с обслуживающими их сервисами.

В данном файле приведён пример реализации контроллера с комментариями

```ts
export class UserController extends Controller {
  // API Префикс контроллера
  controllerApiPrefix = "/user";
  // Массив роутов приложения
  routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req,res)=>{ res.send('hello world')},
      path: "/list" // http://server.foo.bar/user/list
    }
  ];
  middlewares = (): IMiddleware[] => [];
}
```

## Middleware

Чтобы устанавливать промежуточные обработчики, будь то авторизация, проверка роли пользователя, даже целая подсистема RBAC, расширенный конвеер валидации или еще что-нибудь - вы можете использовать массив промежуточных обработчиков в классе Controller. 

Он описывается интерфейсом IMiddleware. Все мидлвары загружаются непосредственно перед роутами в контейнере.

Ниже приведён пример описания middleware в контроллере.

```ts
export class UserController extends Controller {
  // API Префикс контроллера
  controllerApiPrefix = "/user";
  // Массив роутов приложения
  routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req,res)=>{ res.send(req.msg)}, // Выведет hello world
      path: "/list" // http://server.foo.bar/user/list
    }
  ];
  middlewares = (): IMiddleware[] => [
    {
      paths:['/list'], // Установить 
      uses:(req,res,next) => { req.msg = "hello world"; next(); }
    },
  ];
}
```
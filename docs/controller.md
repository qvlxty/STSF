# Контроллер (deprecated)

Контроллер представляет из себя программный слой, в котором идёт связывание конкретных роутов приложений с обслуживающими их сервисами.

В данном файле приведён пример реализации контроллера с комментариями

```ts
  // URL Префикс контроллера
@ControllerPrefix('/user')
export class UserController extends Controller {
  // Массив роутов приложения
  routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req, res) => {
        res.send("hello world");
      },
      path: "/list" // http://server.foo.bar/user/list
    }
  ];
  middlewares = (): IMiddleware[] => [];
}
```

### MethodApi декоратор

Начиная с версии 0.3 , для описания методов контроллера используются декораторы @MethodApi()

```ts
import {  ApiMethod, HttpMethod } from "frameworkCore/decorators/controller.decorator";

 @ApiMethod(HttpMethod.GET, '/')
  public helloWorld(req, res) {
    res.send('hello world');
  }
```

### Префикс

Для того, чтобы контроллер находился в обособленной части API, можно использовать декоратор ``@ControllerPrefix(string)``

## Middleware

Чтобы устанавливать промежуточные обработчики, будь то авторизация, проверка роли пользователя, даже целая подсистема RBAC, расширенный конвеер валидации или еще что-нибудь - вы можете использовать массив промежуточных обработчиков в классе Controller.

Он описывается интерфейсом IMiddleware. Все мидлвары загружаются непосредственно перед роутами в контейнере.

Ниже приведён пример описания middleware в контроллере.

```ts
@ControllerPrefix('/user')
export class UserController extends Controller {
  // Массив роутов приложения
  routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req, res) => {
        res.send(req.msg);
      }, // Выведет hello world
      path: "/list" // http://server.foo.bar/user/list
    }
  ];
  middlewares = (): IMiddleware[] => [
    {
      paths: ["/list"], // Установить
      uses: (req, res, next) => {
        req.msg = "hello world";
        next();
      }
    }
  ];
}
```

Гибкая настройка позволяет задавать middleware для множества постов через два массива **paths** и **uses**.

````ts
routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req, res) => {
        console.info(req.msg)
        res.send(req.msg);
      },
      path: "/helloWorld"
    },
    {
      method: HttpMethod.GET,
      action: this.getUsers,
      path: "/list"
    }
  ];

  middlewares = (): IMiddleware[] => [
    {
      paths: ["/list","/helloWorld"],
      uses: [
        (req, res, next) => {
          req.msg = "hello world"
          next();
        },
        (req, res, next) => {
          req.msg2 = "have a good day"
          next();
        }
      ]
    }
    ```
````

В приведенном выше примере две стрелочные функции сохраняют строки в request объект. Обе функции устанавливаются на роуты с путями /list и /helloworld. 

# Контроллер (deprecated)

Контроллер представляет из себя программный слой, в котором идёт связывание конкретных роутов приложений с обслуживающими их сервисами.

В данном файле приведён пример реализации самого простого контроллера с комментариями

```ts
  // URL Префикс контроллера
@ControllerApiPrefix('/user')
export class UserController extends Controller {

  // Декоратор определяющий тип метода 
  @Get('/hello')
  // Функция-обработчик
  helloWorld(req, res) {
    return "hello world";
  }

```

Если к приложению подключен генератор [документации](./doc.generate.md), то все новые роуты для контроллеров вы сможете видеть по адресу **/doc**

Если используется AppExpress реализация, то каждый метод контролера 
должен получать на вход два параметра - req и res соответственно - это request и response объекты библиотеки express.

Если метод контроллера должен возвращать JSON, тогда достаточно использовать return, как в приведенном выше примере.

### Обработка ошибок

Для обработки ошибок используется класс HttpException, который можно наследовать и переиспользовать для своих ошибок. Пример использования в методе контроллера:

```ts
import { HttpException } from "frameworkCore/exceptions/BaseHttpException";
...

  @Get('/hello')
  helloWorld(req, res) {
    if (!req.body.data)
      throw new HttpException()
    return "hello world";
  }
```

### Рендеринг страничек

Вместо return , необходимо использовать отрисовки файла шаблона , достаточно вызвать res.render();

```ts

  @Get('/')
  public async getUsers (req: Request, res: Response) {
    res.render("user/index", await this.userService.getUsers());
  };

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

  @Get('/helloworld')
  public hello(req,res) {
    res.send('hello')
  }

  @Get('/list')
  public takeList(req,res) {
    return [1,2,3,4,5];
  }

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

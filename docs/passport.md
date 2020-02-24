# PassportJS

Если вашему приложению требуется система аутентификации и авторизации (Возможно даже простая RBAC), то во фреймворке уже предусмотрена работа с middleware и методами для аутентификации пользователя.

Настоятельно рекомендуется читать [официальную документацию](http://www.passportjs.org/docs/downloads/html), чтобы понимать подходы работы модуля.

Настройки Passportjs находятся в файле **application/passport/passport.service.ts**

## Стратегии

Для настройки стратегирования используется функция getStrategy. Подробнее про стратегирование можно прочитать на [официальной документации](http://www.passportjs.org/docs/downloads/html/)

## Сессии

Для того, чтобы сервер хранил метаданные (например, ключи авторизации), которые позволяют серверу распознать пользователя, необходимо исопльзовать middleware модули сессий. В качестве модулей для хранения сессий, можете использовать:

- [express-mysql-session](https://www.npmjs.com/package/express-mysql-session)
- [express-session](https://www.npmjs.com/package/express-session)

Установить их можно в **main.ts** или в любой другой точке входа с помощью метода setupApp:

```ts
...
import expressSession = require('express-session');
 const expressApp = new AppExpress();
  expressApp.setupApp({
    modules: [
      passport.initialize(),
      passport.session(),
      expressSession({secret:"cat"})
      bodyParser.urlencoded({ extended: true }),

    ]
  });
```


## Сериализация и десериализация пользователя 

Чтобы проверка и генерация ключей сеансов корректно работала, необходимо их уметь сереализовывать и десереализовывать. Для этого используются функции сереализации и десереализации.

Данные методы хорошо использовать при JWT авторизации: производить проверку подписи jwt с помощью ключа, о котором осведомлен сам сервер.


## Метод аутентификации

Перед тем, как создать метод для аутентификации пользователя, необходимо сделать функцию-проверку пользователя в системе по логину-паролю, установить данную функцию в логику работы стратегии

Пример простой аутентификцаии по Логину-Паролю

```ts
export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
  }

  authUser = (login, password): Promise<number> => {
    return this.userRepository.model.count({
      where: {
        login,
        password
      }
    });
  };
}
```

В данном примере нелучшая практика поиска по открытому паролю; Рекомендуется хранение хешей паролей; Для хэширования паролей, можете использовать все, что угодно (bcrypt,argon2,etc...)

Приведенный выше пример функции **authUser(username,password)** можете использовать в сервисе passportService, на примере **LocalStrategy**

```ts
getStrategy = (): Strategy => {
  return new Strategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    async (username, password, done) => {
      const countUsers = await this.userService.authUser(username, password);
      if (countUsers > 0) done(null, { username });
      done({ msg: "Wrong email or password" }, null);
    }
  );
};
```


## Пример готового PassportService

```ts
// passport.service.ts
import { BaseService } from "frameworkCore/base.service";
import { Container } from "frameworkCore/container.class";
import { Strategy } from "passport-local";
import { UserService } from "application/modules/user/user.service";
import passport = require("passport");

export class PassportService extends BaseService {
  constructor(
    e: Container,
    private readonly userService: UserService = e.getService(UserService)
  ) {
    super(e);
    passport.use(this.getStrategy());
    passport.serializeUser(this.serializer);
    passport.deserializeUser(this.deserializer);
  }

  serializer = (user, done) => {
    done(null, user);
  };

  deserializer = async (user, done) => {
    done(null, user);
  };

  getStrategy = (): Strategy => {
    return new Strategy(
      {
        usernameField: "login",
        passwordField: "password"
      },
      async (username, password, done) => {
        const user: any = await this.userService.getUserByLogin(username, [
          "id",
          "login",
          "password"
        ]);
        if (user === null) {
          done("Login invalid");
          return;
        }
        // Измените на проверку хешей
        if (user.password === password) {
          // Не будем хранить пароль в метаданных req.user
          delete user.password
          done(null, user);
        }
        else done("Invalid Password", null);
      }
    );
  };

  // MiddleWare Для Авторизации (Если пользователь не авторизован - выбрасываем)
  async AuthGuard(req, res, next) {
    if (req.user !== null && req.user !== undefined) {
      next();
    } else {
      res.redirect("/");
    }
  }
}
```

```ts
// user.service.ts
import { BaseService } from "../../../frameworkCore/base.service";
import { Container } from "../../../frameworkCore/container.class";
import { UserRepository, User } from "./user.repository";

export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
  }

  authUser = (login, password): Promise<number> => {
    return this.userRepository.model.count({
      where: {
        login,
        password
      }
    });
  };

  getUserById = (id: number): Promise<User | null> =>
    this.userRepository.model.findOne({
      where: { id },
      attributes: ["id", "login"]
    });

  getUserByLogin = (
    login: string,
    attributes: string[] = ["id", "login"]
  ): Promise<User | null> =>
    this.userRepository.model.findOne({
      where: { login },
      attributes
    });

  createUser = () => {
    return this.userRepository.model.create({
      login: "admin",
      password: "123456"
    });
  };
  getUsers = () => {
    return this.userRepository.model.findAll();
  };
}
```

Контроллер с методом аутентификации и AuthGuard:

```ts
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { Container } from "frameworkCore/container.class";
import {
  Controller,
  HttpMethod,
  IRoute,
  IMiddleware
} from "frameworkCore/base.controller";
import passport = require("passport");
import bodyParser = require("body-parser");
import { PassportService } from "application/passport/passport.service";

export class UserController extends Controller {
  constructor(
    c: Container,
    private readonly userService: UserService = c.getService(UserService),
    private readonly passportService: PassportService = c.getService(
      PassportService
    )
  ) {
    super(c);
  }
  controllerApiPrefix = "/user";
  routes = (): IRoute[] => [
    {
      method: HttpMethod.GET,
      action: (req, res) => {
        res.send("hello world");
      },
      path: "/helloWorld"
    },
    {
      method: HttpMethod.POST,
      action: (req, res) => {
        res.send("hello");
      },
      path: "/auth",
      description: "Метод для аутентификации :-)",
      inData: { login: "user", password: "qwerty" },
      outData:
        "400 ошибка, если запрос неверен. 200 Если вход успешен. 401 если креды неправильные"
    }
  ];

  middlewares = (): IMiddleware[] => [
    {
      // По адресу server/user/auth производится аутентификация пользователя
      paths: ["/auth"],
      uses: [passport.authenticate("local")]
    },
    {
        // Роуты этого массива будут защищены AuthGuard.
        //  Если пользователь не авторизован - его перенесет на /
        // см. passport.service.ts
      paths: ["/helloworld"],
      uses: [this.passportService.AuthGuard]
    }
  ];
}

```
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
import { PassportService } from "application/passport/passport.service";
import { ControllerApiPrefix, GET,POST } from "frameworkCore/decorators/controller.decorator";

@ControllerApiPrefix('/user')
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

  // @ApiMethod(
  //   HttpMethod.GET, 
  //   '/hello',
  //   'Роут для отображения фразы HelloWorld'
  // )
  helloWorld(req, res) {
    return "hello world";
  }

  // @ApiMethod(
  //   HttpMethod.POST,
  //   '/auth',
  //   'Метод для аутентификации',
  //   { login: "user", password: "qwerty" },
  //   "400 ошибка, если запрос неверен. 200 Если вход успешен. 401 если креды неправильные"
  // )
  auth(req,res) {
    res.send('hello');
  }

  middlewares = (): IMiddleware[] => [
    {
      paths: ["/auth"],
      uses: [passport.authenticate("local")]
    },
    {
      paths: ["/helloworld"],
      uses: [this.passportService.AuthGuard]
    }
  ];

  // @ApiMethod(HttpMethod.GET, )
  // public getUsers (req: Request, res: Response) => {
  //   res.render("user/index", await this.userService.getUsers());
  // };
}

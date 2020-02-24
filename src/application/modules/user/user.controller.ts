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
      paths: ["/auth"],
      uses: [passport.authenticate("local")]
    },
    {
      paths: ["/helloworld"],
      uses: [this.passportService.AuthGuard]
    }
  ];

  getUsers = async (req: Request, res: Response) => {
    console.log(req.user);
    res.render("user/index", await this.userService.getUsers());
  };
}

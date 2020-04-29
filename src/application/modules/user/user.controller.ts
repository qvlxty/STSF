import { UserService } from "./user.service";
import { Request, Response } from "express";
import { Container } from "frameworkCore/container.class";
import {
  Controller,
  IMiddleware
} from "frameworkCore/base.controller";
import passport = require("passport");
import { PassportService } from "application/passport/passport.service";
import { ControllerApiPrefix, Get, Post, ApiMethodDescription } from "frameworkCore/decorators/controller.decorator";

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

  @Get('/hello')
  helloWorld(req, res) {
    return "hello world";
  }

  @Post('/auth')
  @ApiMethodDescription({
    description: 'Метолд аутентификации',
    inData: { login: "user", password: "qwerty" }
  })
  auth(req, res) {
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

  @Get('/')
  public async getUsers (req: Request, res: Response) {
    res.render("user/index", await this.userService.getUsers());
  };
}

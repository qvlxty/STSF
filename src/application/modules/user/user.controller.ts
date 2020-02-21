import { UserService } from "./user.service";
import { Request, Response } from "express";
import { Container } from "frameworkCore/container.class";
import {
  Controller,
  HttpMethod,
  IRoute,
  IMiddleware
} from "frameworkCore/base.controller";

export class UserController extends Controller {
  constructor(
    c: Container,
    private readonly userService: UserService = c.getService(UserService)
  ) {
    super(c);
  }
  controllerApiPrefix = "/user";
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
        }
      ]
    }
  ];

  getUsers = async (req: Request, res: Response) => {
    res.render("user/index", await this.userService.getUsers());
  };
}

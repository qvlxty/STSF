import { UserService } from "./user.service";
import { Request, Response } from "express";
import { Container } from "core/container.class";
import { Controller, HttpMethod } from "core/base.controller";

export class UserController extends Controller {
  constructor(
    c: Container,
    private readonly userService: UserService = c.getService(UserService)
  ) {
    super(c);
  }
  controllerApiPrefix = "/user";
  routes = () => [
    {
      method: HttpMethod.GET,
      action: this.getUsers,
      path: "/list"
    }
  ];

  getUsers = async (req: Request, res: Response) => {
    res.json(await this.userService.getUsers());
  };
}

import { Controller, IRoute, HttpMethod } from "../../../core/base.controller";
import { Container } from "core/container.class";
import { UserService } from "./user.service";

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
        action: this.userService.getUsers,
        path: "/list"
      }
    ];
  }
}

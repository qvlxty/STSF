import * as Express from "express";
import { IRoute, HttpMethod } from "./base.controller";

export abstract class App {
  constructor(server, router) {
    this.mServer = server;
    this.mRouter = router;
  }
  private mServer;
  private mRouter;
  get server() {
    return this.mServer;
  }
  get router() {
    return this.mRouter;
  }

  abstract routeInstall = (route: IRoute) => {};
}

export class AppExpress extends App {
  constructor(server = Express(), router: Express.Router = Express.Router()) {
    super(server, router);
    server.use(router);
  }

  routeInstall = (r: IRoute, controllerPrefix: string = "") => {
    switch (r.method) {
      case HttpMethod.GET:
        this.router.get(`${controllerPrefix}${r.path}`, r.action);
        break;
      case HttpMethod.POST:
        this.router.post(`${controllerPrefix}${r.path}`, r.action);
        break;
      case HttpMethod.PATCH:
        this.router.patch(`${controllerPrefix}${r.path}`, r.action);
        break;
      case HttpMethod.UPDATE:
        this.router.update(`${controllerPrefix}${r.path}`, r.action);
        break;
      case HttpMethod.DELETE:
        this.router.delete(`${controllerPrefix}${r.path}`, r.action);
        break;
    }
  }
}

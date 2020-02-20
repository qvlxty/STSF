import * as Express from "express";
import { IRoute, HttpMethod } from "./base.controller";

interface ISettings {
  viewEngine?: string; // Шаблонизатор
  modules?: any[]; // .use(...)
  staticFolders?: { path: string; folder: string }[];
}

/*
  Абстрактный класс на основе которого
  можно писать реализации для других библиотек
*/
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

  // Функция для установки роутов в приложение/библиотеку
  abstract routeInstall = (route: IRoute) => {};
  // Функция для настройки приложения/библиотеки
  abstract setupApp = (settings: ISettings) => {};
}

/*
  Пример реализации для библиотеки ExpressJS
*/ 
export class AppExpress extends App {
  constructor(server = Express(), router: Express.Router = Express.Router()) {
    super(server, router);
    server.use(router);
  }

  setupApp = ({ viewEngine, modules, staticFolders }: ISettings) => {
    if (viewEngine !== null) this.server.set("view engine", viewEngine);
    if (modules !== null) for (const iter of modules) this.server.use(iter);
    if (staticFolders !== null)
      for (const iter of staticFolders)
        this.server.use(iter.path, Express.static(iter.path));
  };

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
  };
}

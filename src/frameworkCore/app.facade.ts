import * as Express from "express";
import { IRoute, HttpMethod, IMiddleware } from "./base.controller";

interface ISettings {
  viewEngine?: string; // Шаблонизатор
  modules?: any[]; // .use(...) Мидлвары
  staticFolders?: { path: string; folder: string }[]; // Каталоги со статикой
  viewCatalog?: string; // Каталог view файлов
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
  // Функция для установки мидлвары в приложение/библиотеку
  abstract middlewareInstall = (middleware: IMiddleware) => {};
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
    this.setupApp({});
  }

  setupApp = ({
    viewEngine = "ejs",
    modules = [],
    staticFolders = [],
    viewCatalog = "src/application/views"
  }: ISettings) => {
    if (typeof viewEngine !== undefined && viewEngine !== null)
      this.server.set("view engine", viewEngine);
    if (typeof modules !== undefined && modules !== null)
      for (const iter of modules) this.server.use(iter);
    if (typeof staticFolders !== undefined && staticFolders !== null)
      for (const iter of staticFolders)
        this.server.use(iter.path, Express.static(iter.path));
    if (typeof viewCatalog !== undefined && viewCatalog !== null)
      this.server.set("views", viewCatalog);
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

  middlewareInstall = (m: IMiddleware, prefix: string = "") => {
    for (const p of m.paths) {
      for (const u of m.uses) {
        this.router.use(`${prefix}${p}`, u);
      }
    }
  };
}

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
  abstract routeInstall = (controller, route: IRoute, controllerPrefix: string = "") => { };
  // Функция для установки мидлвары в приложение/библиотеку
  abstract middlewareInstall = (middleware: IMiddleware, prefix: string = "") => { };
  // Функция для настройки приложения/библиотеки
  abstract setupApp = (settings: ISettings) => { };
}

/*
  Пример реализации для библиотеки ExpressJS
*/

export class AppExpress extends App {
  constructor(server: Express.Application = Express(), router: Express.Router = Express.Router()) {
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
      for (const iter of modules) this.router.use(iter);
    if (typeof staticFolders !== undefined && staticFolders !== null)
      for (const iter of staticFolders)
        this.server.use(iter.path, Express.static(iter.folder));
    if (typeof viewCatalog !== undefined && viewCatalog !== null)
      this.server.set("views", viewCatalog);
  };

  routeInstall = (controller, r: IRoute, controllerPrefix: string = "") => {
    const methodName = r.method.toLocaleLowerCase();
    // Чтоб не потерять контекст используется функция-обертка
    const wrapper = async (req,res) => { await controller[r.methodName](req,res); }
    this.router[methodName](`${controllerPrefix}${r.path}`, wrapper);
  };

  middlewareInstall = (m: IMiddleware, prefix: string = "") => {
    for (const p of m.paths) {
      for (const u of m.uses) {
        this.router.use(`${prefix}${p}`, u);
      }
    }
  };
}

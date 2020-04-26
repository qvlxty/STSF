import { BaseService } from "./base.service";
import { Controller } from "./base.controller";
import { DbService } from "./services/db/db.service";
import { AppExpress } from "./app.facade";
import { Connection, Repository, ObjectType, EntitySchema } from "typeorm";

interface IServiceStack {
  [key: string]: BaseService;
}
interface IControllerStack {
  [key: string]: Controller;
}

export class Container {
  private services: IServiceStack;
  private controllers: IControllerStack;
  private dbService: DbService;
  constructor() {
    this.controllers = {};
    this.services = {};
    this.installDbService(DbService);
  }

  async init(controllers?) {
    await this.initDbConnection();
    if (controllers) this.loadControllers(controllers);
  }

  public installDbService(dbService) {
    this.dbService = new dbService(this);
  }

  get getDbService(): DbService {
    if (this.dbService === null) {
      console.error("[SERVER] Не настроен сервис обслуживания базы данных.");
    }
    return this.dbService;
  }

  get getConnection(): Connection {
    return this.getDbService.connection;
  }
  async initDbConnection() {
    console.info(
      "\x1b[36m%s\x1b[0m", "[SERVER] Подключение к бд создано");
    await this.dbService.setupConnection();
  }

  /*
    Входные параметры:
    @RepoClass - Указатель на класс репозитория
  */
  public getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
    return this.getConnection.getRepository(target);
  }

  public registerService(service) {
    this.services[service.name] = new service(this);
  }

  public registerController(controller) {
    this.controllers[controller.name] = new controller(this);
  }

  public loadControllers(controllers: any[]) {
    for (const c of controllers) {
      this.registerController(c);
    }
  }

  public getService = (type): any => {
    if (
      this.services[type.name] === null ||
      typeof this.services[type.name] === "undefined"
    ) {
      this.registerService(type);
    }
    return this.services[type.name];
  };
  public getController = (type): any => {
    if (
      this.controllers[type.name] === null ||
      typeof this.controllers[type.name] === "undefined"
    ) {
      // this.registerController(type);
    }
    return this.controllers[type.name];
  };

  // Функция обустраивает роутер методами всех контроллеров
  public loadRoutes({ routeInstall, middlewareInstall }: AppExpress) {
    for (const iter of Object.values(this.controllers)) {
      for (const m of iter.middlewares())
        middlewareInstall(m, iter.controllerApiPrefix);
      for (const r of iter.routes()) routeInstall(r, iter.controllerApiPrefix);
    }
  }
  // Возвращает все роуты в контейнере
  public getAllRoutes = () =>
    Object.values(this.controllers).map(el => ({
      prefix: el.controllerApiPrefix,
      routes: el.routes()
    }));
}

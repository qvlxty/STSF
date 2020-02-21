import { BaseService } from "./base.service";
import { Repository } from "./base.repository";
import { Controller } from "./base.controller";
import { DbService } from "./services/db/db.service";

interface IServiceStack {
  [key: string]: BaseService;
}
interface IRepositoryStack {
  [key: string]: Repository<any>;
}
interface IControllerStack {
  [key: string]: Controller;
}

export class Container {
  private services: IServiceStack;
  private repositories: IRepositoryStack;
  private controllers: IControllerStack;
  private dbService: DbService;
  constructor(
    {
      controllers,
      dbService
    }: {
      controllers?: typeof Controller[];
      dbService?: typeof DbService;
    } = null
  ) {
    this.controllers = {};
    this.services = {};
    this.repositories = {};
    if (dbService) this.installDbService(dbService);
    if (controllers) this.loadControllers(controllers);
  }

  public installDbService(dbService) {
    this.dbService = new dbService(this);
  }

  get getDbService() {
    if (this.dbService === null) {
      console.error("[SERVER] Не настроен сервис обслуживания базы данных.");
    }
    return this.dbService;
  }

  public registerRepository(repository) {
    this.repositories[repository.name] = new repository(this);
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

  public loadRepositories(repos: any[]) {
    for (const c of repos) {
      this.registerRepository(c);
    }
  }

  // ToDo: вскрыть на что можно заменить any (нужен указатель на класс)
  public getRepository = (type): Repository<any> => {
    if (
      this.repositories[type.name] === null ||
      typeof this.repositories[type.name] === "undefined"
    ) {
      this.registerRepository(type);
    }
    return this.repositories[type.name];
  };
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
  public loadRoutes({ server, router, routeInstall }) {
    for (const iter of Object.values(this.controllers))
      for (const r of iter.routes()) routeInstall(r, iter.controllerApiPrefix);
  }
}

import { BaseService } from "./base.service";
import { Model } from "./base.model";
import { Controller, HttpMethod } from "./base.controller";

interface IServiceStack {
  [key: string]: BaseService;
}
interface IModelStack {
  [key: string]: Model<any>;
}
interface IControllerStack {
  [key: string]: Controller;
}

export class Container {
  private services: IServiceStack;
  private models: IModelStack;
  private controllers: IControllerStack;
  constructor() {
    this.services = {};
    this.models = {};
    this.controllers = {};
  }

  public registerModel(model) {
    this.models[model.name] = new model(this);
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

  // ToDo: вскрыть на что можно заменить any (нужен указатель на класс)
  public getModel = (type): Model<any> => {
    if (
      this.models[type.name] === null ||
      typeof this.models[type.name] === "undefined"
    ) {
      this.registerModel(type);
    }
    return this.models[type.name];
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

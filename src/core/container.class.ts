import { BaseService } from "./base.service";
import { Model } from "./base.model";

interface IServiceStack {
  [key: string]: BaseService;
}
interface IModelStack {
  [key: string]: Model<any>;
}

export class Container {
  private services: IServiceStack;
  private models: IModelStack;
  constructor() {
    this.services = {};
    this.models = {};
  }

  // Хранить оригинальные и единственные экземпляры через <string,dependency>
  public registerModel(model) {
    this.models[model.name] = new model(this);
  }

  // ToDo: какой тип указать для service, чтобы попадали только классы
  public registerService(service) {
    this.services[service.name] = new service(this);
  }

  // ToDo: вскрыть на что можно заменить any (нужен указатель на класс)
  public getModel = (type): any => {
    if (this.models[type.name] === null || typeof this.models[type.name] === 'undefined') {
      this.registerModel(type);
    };
    return this.models[type.name];
  };
  public getService = (type): any => {
    if (this.services[type.name] === null || typeof this.services[type.name] === 'undefined') {
      this.registerService(type);
    };
    return this.services[type.name];
  };

}

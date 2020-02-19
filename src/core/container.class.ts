import { BaseService } from "./base.service";
import { Model } from "./base.model";

interface IServiceStack {
  [key: string]: BaseService;
}
interface IModelStack {
  [key: string]: Model;
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
  public getModel = (type): any | null => {
    return this.models[type.name];
  };
  public getService = (type): any | null => {
    return this.services[type.name];
  };

}

import { Container } from "./container.class";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export interface IRoute {
  method: HttpMethod;
  path: string;
  action: (req, res) => any | Promise<any>;
  // Функция валидации
  validation?: (req, res, next) => any;
  // Описание роута
  description?: string;
  // Формат входных данных
  inData?: Object;
  // Формат выходных данных
  outData?: Object;
}

export interface IMiddleware {
  uses: ((req, res, next) => any)[];
  paths: string[];
}

export abstract class Controller {
  // Префикс, используемый для обособления контроллеров
  public controllerApiPrefix: string;
  // Абстрактный метод, который настраивает роутинг
  public abstract routes(): IRoute[];
  public abstract middlewares(): IMiddleware[];
  constructor(private readonly mainContainer: Container) {
    if (this.controllerApiPrefix === null) {
      this.controllerApiPrefix = ''
    }
  }
}

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
  methodName: string;
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
  public routes: IRoute[];
  public middlewares = (): IMiddleware[] => [];
  constructor(private readonly mainContainer: Container) {
    console.info("\x1b[32m%s\x1b[0m", `[SERVER] Контроллер ${this.constructor.name}`)
  }
}

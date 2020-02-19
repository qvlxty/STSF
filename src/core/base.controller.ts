import { Container } from "./container.class";

export enum HttpMethod {
  GET,
  POST,
  PATCH,
  UPDATE,
  DELETE
}

export interface IRoute {
  method: HttpMethod;
  path: string;
  action: (req, res) => any | Promise<any>;
}

export abstract class Controller {
  // Префикс, используемый для обособления контроллеров
  public controllerApiPrefix: string;
  // Абстрактный метод, который настраивает роутинг
  public abstract routes(): IRoute[];
  constructor(
    private readonly mainContainer: Container,
    apiPrefix: string = "/"
  ) {}
}

import { Container } from "./container.class";
import { Model } from "./base.model";

export abstract class BaseService {
  // Контейнер из которого можно загружать зависимости
  constructor(private readonly mainContainer: Container) {}
}

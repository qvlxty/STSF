import { Container } from "./container.class";

export abstract class BaseService {
  constructor(private readonly mainContainer: Container) {
    console.info("\x1b[34m%s\x1b[0m",`[SERVER] Сервис ${this.constructor.name} загружен`);
  }
}

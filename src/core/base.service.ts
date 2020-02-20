import { Container } from "./container.class";

export abstract class BaseService {
  constructor(private readonly mainContainer: Container) {
    console.info(`[SERVER] Service ${this.constructor.name} loaded`)
  }
}

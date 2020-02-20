import { Container } from "./container.class";

export abstract class Repository<Model> {
  private readonly model: Model;
  constructor(private readonly mainContainer: Container) {
    console.info(`[SERVER] Repository ${this.constructor.name} loaded`);
    this.model = this.loadSchema();
  }
  abstract loadSchema(): Model;
}

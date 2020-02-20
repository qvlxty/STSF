import { Container } from "./container.class";
import { DbService } from "./services/db/db.service";

export abstract class Repository<Model> {
  public readonly model: Model;
  constructor(private readonly mainContainer: Container) {
    console.info(`[SERVER] Repository ${this.constructor.name} loaded`);
    this.model = this.loadSchema(mainContainer.getDbService);
  }
  abstract loadSchema(dbService: DbService): Model;
}

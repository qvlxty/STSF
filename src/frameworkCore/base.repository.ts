import { Container } from "./container.class";
import { DbService } from "./services/db/db.service";

export abstract class Repository<Model> {
  public readonly model: Model;
  constructor(private readonly mainContainer: Container) {
    console.info("\x1b[32m%s\x1b[0m",`[SERVER] Репозиторий ${this.constructor.name} загружен`);
    this.model = this.loadSchema(mainContainer.getDbService);
  }
  abstract loadSchema(dbService: DbService): Model;
}

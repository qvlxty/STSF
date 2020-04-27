import { DbService } from "../db.service";
import { createConnection, Connection } from 'typeorm';
import { ConfigService } from "frameworkCore/services/config/config.service";

export class TypeormDBService extends DbService {
  constructor(c, private readonly configService: ConfigService = c.getService(ConfigService)) {
    super(c);
  }
  public async setupConnection() {
    this.connection = await createConnection({
      type: this.configService.config.get("db.type"),
      host: this.configService.config.get("db.host"),
      port: this.configService.config.get("db.port"),
      database: this.configService.config.get("db.dbname"),
      username: this.configService.config.get("db.name"),
      password: this.configService.config.get("db.password"),
      entities: this.configService.config.get("db.entities")
    });
    return this.connection;
  }
  public async syncSchema() {
    await this.connection.synchronize();
  }
}
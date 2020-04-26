import { BaseService } from "../../base.service";
import { Container } from "../../container.class";
import { Connection } from "typeorm";
import { createConnection } from "typeorm";
import { ConfigService } from "../config/config.service";

/*
  Данный класс работает с TypeORM и завязан на ней
*/
export class DbService extends BaseService {
  /* 
    Подключение которое используют все модели.
    Обращение к данному подключению ненадежно, вместо этого
    используется геттер dbConnection
  */
  public connection: Connection = null;
  constructor(c: Container, private readonly configService: ConfigService = c.getService(ConfigService)) {
    super(c);
  }

  // Функция для настройки подключения 
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

}

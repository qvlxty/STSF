import { Sequelize } from "sequelize";
import { DbService } from "core/services/db/db.service";
import { ConfigService } from "core/services/config/config.service";
import { Container } from "core/container.class";

export class DbMysqlService extends DbService {
  constructor(
    c: Container,
    private readonly configService: ConfigService = c.getService(ConfigService)
  ) {
    super(c);
  }

  public setupConnection = () => {
    this.connection = new Sequelize(
      this.configService.config.get("db.dbname"),
      this.configService.config.get("db.name"),
      this.configService.config.get("db.password"),
      {
        dialect: "mysql"
      }
    );
  };

  public syncSchema = async () => {
    await this.dbConnection().sync();
  };

  async mainMigrate() {
    // Подключать классы миграции сюда
  }
}

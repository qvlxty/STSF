import { BaseService } from "../../core/base.service";
import { Container } from "../../core/container.class";
import { ConfigService } from "../../implements/config/config.service";
import { Sequelize, DataTypes } from "sequelize";
import {
  User,
  UserRepository
} from "../../implements/modules/user/user.repository";
import { UserSchema } from "./schema/user.schema";

export class DbService extends BaseService {
  private readonly connection;
  get dbConnection(): Sequelize {
    return this.connection;
  }
  constructor(
    c: Container,
    private readonly configService: ConfigService = c.getService(ConfigService)
  ) {
    super(c);
    this.connection = new Sequelize(
      configService.config.get("db.dbname"),
      configService.config.get("db.name"),
      configService.config.get("db.password"),
      {
        dialect: "mysql"
      }
    );
    this.initModels(c);
  }

  public syncSchema = async () => {
    await this.dbConnection.sync();
  };

  public initModels(c: Container) {
    console.info("[SERVER] Initial Models...");
    User.init(UserSchema, { sequelize: this.connection });
    c.getRepository(UserRepository).model = User;
    console.info("[SERVER] Models loaded");
  }

  async mainMigrate() {
    // Подключать классы миграции сюда
  }
}

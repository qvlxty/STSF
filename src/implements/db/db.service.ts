import { BaseService } from "../../core/base.service";
import { Container } from "../../core/container.class";
import { ConfigService } from "../../implements/config/config.service";
import { Sequelize, DataTypes } from "sequelize";
import {
  User,
  UserRepository
} from "../../implements/modules/user/user.repository";

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
    c.getRepository(UserRepository).model = User.init(
      {
        login: DataTypes.STRING,
        password: DataTypes.STRING
      },
      { sequelize: this.connection }
    );
    console.log(c.getRepository(UserRepository));
  }

  async mainMigrate() {
    // Подключать классы миграции сюда
  }
}

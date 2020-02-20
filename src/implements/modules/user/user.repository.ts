import { DataTypes, Model } from "sequelize";
import { DbMysqlService } from "implements/db/db.mysql.service";
import { Repository } from "core/base.repository";

export class User extends Model {}
export class UserRepository extends Repository<typeof User> {
  loadSchema(dbService: DbMysqlService) {
    console.info(dbService.dbConnection);
    User.init(
      {
        login: DataTypes.STRING,
        password: DataTypes.STRING
      },
      { sequelize: dbService.dbConnection() }
    );
    return User;
  }
}

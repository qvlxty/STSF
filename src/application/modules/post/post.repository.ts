// user.repository.ts
import { DataTypes, Model } from "sequelize";
import { DbMysqlService } from "application/db/db.mysql.service";
import { Repository } from "frameworkCore/base.repository";

export class Post extends Model {}
export class PostRepository extends Repository<typeof Post> {
  loadSchema(dbService: DbMysqlService) {
    Post.init(
      {
          author: DataTypes.STRING,
          text: DataTypes.TEXT,
      },
      { sequelize: dbService.dbConnection() }
    );
    return Post;
  }
}
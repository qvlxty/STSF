import { Repository } from "../../../core/base.repository";
import sequelize = require("sequelize");

export class Post extends sequelize.Model {}
export class PostRepository extends Repository<Post> {}

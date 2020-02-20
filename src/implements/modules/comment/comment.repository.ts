import { Repository } from "../../../core/base.repository";
import sequelize = require("sequelize");

export class Comment extends sequelize.Model {}
export class CommentRepository extends Repository<Comment> {}

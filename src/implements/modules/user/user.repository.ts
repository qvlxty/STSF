import { Repository } from "../../../core/base.repository";
import sequelize = require("sequelize");

export class User extends sequelize.Model {}
export class UserRepository extends Repository<typeof User> {}

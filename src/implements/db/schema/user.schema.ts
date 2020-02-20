import { DataTypes } from "sequelize";

export const UserSchema = {
  login: DataTypes.STRING,
  password: DataTypes.STRING
};

import { DataTypes, Model } from "sequelize";
import db from "../config/database";

class user extends Model {}

user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    promotions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    authProvider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "local", // Default to local authentication
    },
  },
  {
    sequelize: db,
    modelName: "user",
    timestamps: true,
  }
);

export default user;

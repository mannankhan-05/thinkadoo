import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import user from "../models/user";

class coupon extends Model {}

coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "coupon",
    timestamps: true,
  }
);

coupon.belongsTo(user, {
  foreignKey: "userId",
});

export default coupon;

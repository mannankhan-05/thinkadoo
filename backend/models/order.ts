import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import book from "./book";

class order extends Model {}

order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_apt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    delivery_type: {
      type: DataTypes.ENUM("standard", "fast"),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "order",
    timestamps: true,
  }
);

export default order;

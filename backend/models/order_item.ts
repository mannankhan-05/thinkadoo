import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import order from "./order";
import book from "./book";

class order_item extends Model {}

order_item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "order_item",
  }
);

order_item.belongsTo(order, { foreignKey: "order_id" });
order_item.belongsTo(book, { foreignKey: "book_id" });

export default order_item;

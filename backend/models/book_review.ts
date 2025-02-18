import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import user from "./user";
import book from "./book";

class book_review extends Model {}

book_review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "book_review",
    timestamps: true,
  }
);

book_review.belongsTo(user, { foreignKey: "user_id" });
book_review.belongsTo(book, { foreignKey: "book_id" });

export default book_review;

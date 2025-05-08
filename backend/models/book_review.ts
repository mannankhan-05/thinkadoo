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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "book_review",
    timestamps: true,
  }
);

book_review.belongsTo(book, { foreignKey: "book_id" });

export default book_review;

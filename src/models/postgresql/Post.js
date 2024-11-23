const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING, // MongoDB ID
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);

module.exports = Post;

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Post = require("./Post");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "comments",
    timestamps: true,
  }
);

// Definindo o relacionamento
Comment.belongsTo(Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
});

module.exports = Comment;

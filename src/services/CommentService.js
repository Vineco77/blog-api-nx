const Comment = require("../models/postgresql/Comment");
const Post = require("../models/postgresql/Post");

class CommentService {
  async createComment(postId, commentData, userId) {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new Error("Post não encontrado");
    }

    const { content } = commentData;
    const comment = await Comment.create({
      content,
      postId,
      userId: userId.toString(),
    });

    return comment;
  }

  async listCommentsByPost(postId) {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new Error("Post não encontrado");
    }

    return Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
    });
  }

  async deleteComment(commentId, userId) {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      throw new Error("Comentário não encontrado");
    }

    if (comment.userId !== userId.toString()) {
      throw new Error("Não autorizado");
    }

    await comment.destroy();
  }
}

module.exports = new CommentService();

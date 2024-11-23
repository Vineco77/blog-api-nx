const Comment = require("../models/postgresql/Comment");
const PostService = require("./PostService");

class CommentService {
  async createComment(postId, commentData, userId) {
    const { content } = commentData;

    // Verifica se o post existe através do PostService
    await PostService.getPostById(postId);

    const comment = await Comment.create({
      content,
      postId,
      userId: userId.toString(),
    });

    return comment;
  }

  async listCommentsByPost(postId) {
    // Verifica se o post existe
    await PostService.getPostById(postId);

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

  async verifyCommentOwnership(commentId, userId) {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new Error("Comentário não encontrado");
    }
    return comment.userId === userId.toString();
  }
}

module.exports = new CommentService();

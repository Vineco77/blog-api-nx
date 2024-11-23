const Comment = require("../models/postgresql/Comment");
const Post = require("../models/postgresql/Post");

class CommentController {
  // Criar novo comentário
  async create(req, res) {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const userId = req.user._id;

      // Verifica se o post existe
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      const comment = await Comment.create({
        content,
        postId,
        userId: userId.toString(),
      });

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }

  // Listar comentários de um post
  async listByPost(req, res) {
    try {
      const { postId } = req.params;

      const comments = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
      });

      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar comentários" });
    }
  }

  // Deletar comentário
  async delete(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      // Verifica se o usuário é o dono do comentário
      if (comment.userId !== req.user._id.toString()) {
        return res.status(403).json({ error: "Não autorizado" });
      }

      await comment.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar comentário" });
    }
  }
}

module.exports = new CommentController();

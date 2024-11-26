const CommentService = require("../services/CommentService");

class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentService.createComment(
        req.params.postId,
        req.body,
        req.user._id
      );
      res.status(201).json(comment);
    } catch (error) {
      if (error.message === "Post não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async listByPost(req, res) {
    try {
      const comments = await CommentService.listCommentsByPost(
        req.params.postId
      );
      res.json(comments);
    } catch (error) {
      if (error.message === "Post não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CommentService.deleteComment(req.params.id, req.user._id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Comentário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Não autorizado") {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();

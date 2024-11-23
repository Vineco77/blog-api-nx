const Post = require("../models/postgresql/Post");
const Comment = require("../models/postgresql/Comment");

class PostController {
  // Criar novo post
  async create(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user._id; // ID do usuário autenticado

      const post = await Post.create({
        title,
        content,
        userId: userId.toString(),
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar post" });
    }
  }

  // Listar todos os posts
  async list(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: Comment,
            attributes: ["id", "content", "userId", "createdAt"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar posts" });
    }
  }

  // Buscar post específico
  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ["id", "content", "userId", "createdAt"],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar post" });
    }
  }

  // Atualizar post
  async update(req, res) {
    try {
      const { title, content } = req.body;
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      // Verifica se o usuário é o dono do post
      if (post.userId !== req.user._id.toString()) {
        return res.status(403).json({ error: "Não autorizado" });
      }

      await post.update({ title, content });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar post" });
    }
  }

  // Deletar post
  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      // Verifica se o usuário é o dono do post
      if (post.userId !== req.user._id.toString()) {
        return res.status(403).json({ error: "Não autorizado" });
      }

      await post.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar post" });
    }
  }
}

module.exports = new PostController();

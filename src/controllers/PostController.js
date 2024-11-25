const PostService = require("../services/PostService");

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.createPost(req.body, req.user._id);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const posts = await PostService.listPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const post = await PostService.getPostById(req.params.id);
      res.json(post);
    } catch (error) {
      if (error.message === "Post não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const post = await PostService.updatePost(
        req.params.id,
        req.body,
        req.user._id
      );
      res.json(post);
    } catch (error) {
      if (error.message === "Post não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Não autorizado") {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await PostService.deletePost(req.params.id, req.user._id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Post não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Não autorizado") {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PostController();

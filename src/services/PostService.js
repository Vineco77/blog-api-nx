const Post = require("../models/postgresql/Post");
const Comment = require("../models/postgresql/Comment");
const AppError = require("../utils/AppError");

class PostService {
  async createPost(postData, userId) {
    try {
      const { title, content } = postData;

      const post = await Post.create({
        title,
        content,
        userId: userId.toString(),
      });

      return post;
    } catch (error) {
      throw new AppError("Erro ao criar post", 500);
    }
  }

  async listPosts() {
    try {
      return await Post.findAll({
        include: [
          {
            model: Comment,
            attributes: ["id", "content", "userId", "createdAt"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new AppError("Erro ao listar posts", 500);
    }
  }

  async getPostById(postId) {
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "userId", "createdAt"],
        },
      ],
    });

    if (!post) {
      throw new AppError("Post não encontrado", 404);
    }

    return post;
  }

  async updatePost(postId, postData, userId) {
    const post = await this.getPostById(postId);

    if (post.userId !== userId.toString()) {
      throw new AppError("Não autorizado", 403);
    }

    try {
      const { title, content } = postData;
      await post.update({ title, content });
      return post;
    } catch (error) {
      throw new AppError("Erro ao atualizar post", 500);
    }
  }

  async deletePost(postId, userId) {
    const post = await this.getPostById(postId);

    if (post.userId !== userId.toString()) {
      throw new AppError("Não autorizado", 403);
    }

    try {
      await post.destroy();
    } catch (error) {
      throw new AppError("Erro ao deletar post", 500);
    }
  }
}

module.exports = new PostService();

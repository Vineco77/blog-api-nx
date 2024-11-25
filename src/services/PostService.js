const Post = require("../models/postgresql/Post");
const Comment = require("../models/postgresql/Comment");

class PostService {
  async createPost(postData, userId) {
    const { title, content } = postData;

    const post = await Post.create({
      title,
      content,
      userId: userId.toString(),
    });

    return post;
  }

  async listPosts() {
    return Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "userId", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
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
      throw new Error("Post não encontrado");
    }

    return post;
  }

  async updatePost(postId, postData, userId) {
    const post = await this.getPostById(postId);

    if (post.userId !== userId.toString()) {
      throw new Error("Não autorizado");
    }

    const { title, content } = postData;
    await post.update({ title, content });
    return post;
  }

  async deletePost(postId, userId) {
    const post = await this.getPostById(postId);

    if (post.userId !== userId.toString()) {
      throw new Error("Não autorizado");
    }

    await post.destroy();
  }
}

module.exports = new PostService();

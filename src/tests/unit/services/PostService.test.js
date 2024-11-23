const PostService = require("../../../services/PostService");
const Post = require("../../../models/postgresql/Post");
const mongoose = require("mongoose");

describe("PostService", () => {
  const mockUserId = new mongoose.Types.ObjectId();
  const mockPost = {
    title: "Test Post",
    content: "Test Content",
  };

  describe("createPost", () => {
    it("should create a post successfully", async () => {
      const post = await PostService.createPost(mockPost, mockUserId);

      expect(post).toHaveProperty("id");
      expect(post.title).toBe(mockPost.title);
      expect(post.content).toBe(mockPost.content);
      expect(post.userId).toBe(mockUserId.toString());
    });
  });

  describe("listPosts", () => {
    beforeEach(async () => {
      await Post.destroy({ where: {} });
      await PostService.createPost(mockPost, mockUserId);
    });

    it("should list all posts", async () => {
      const posts = await PostService.listPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0].title).toBe(mockPost.title);
    });
  });

  describe("updatePost", () => {
    let createdPost;

    beforeEach(async () => {
      createdPost = await PostService.createPost(mockPost, mockUserId);
    });

    it("should update post successfully", async () => {
      const updatedData = {
        title: "Updated Title",
        content: "Updated Content",
      };

      const updatedPost = await PostService.updatePost(
        createdPost.id,
        updatedData,
        mockUserId
      );

      expect(updatedPost.title).toBe(updatedData.title);
      expect(updatedPost.content).toBe(updatedData.content);
    });

    it("should not allow unauthorized updates", async () => {
      const differentUserId = new mongoose.Types.ObjectId();

      await expect(
        PostService.updatePost(
          createdPost.id,
          { title: "New Title" },
          differentUserId
        )
      ).rejects.toThrow("Não autorizado");
    });
  });
});

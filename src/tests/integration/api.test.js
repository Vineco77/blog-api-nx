const { request } = require("../setup");
const User = require("../../models/mongodb/User");
const Post = require("../../models/postgresql/Post");

describe("API Integration Tests", () => {
  let authToken;
  let userId;

  const mockUser = {
    name: "Integration Test User",
    username: "integrationuser",
    password: "password123",
  };

  const mockPost = {
    title: "Integration Test Post",
    content: "Integration Test Content",
  };

  beforeAll(async () => {
    // Registra usuário e obtém token
    const response = await request.post("/api/v1/auth/register").send(mockUser);

    authToken = response.body.token;
    userId = response.body.user.id;
  });

  describe("Posts API", () => {
    let postId;

    it("should create a new post", async () => {
      const response = await request
        .post("/api/v1/posts")
        .set("Authorization", `Bearer ${authToken}`)
        .send(mockPost);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe(mockPost.title);

      postId = response.body.id;
    });

    it("should list all posts", async () => {
      const response = await request
        .get("/api/v1/posts")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should update a post", async () => {
      const updateData = {
        title: "Updated Integration Test Post",
        content: "Updated Integration Test Content",
      };

      const response = await request
        .put(`/api/v1/posts/${postId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
    });

    describe("Comments API", () => {
      it("should add a comment to a post", async () => {
        const response = await request
          .post(`/api/v1/posts/${postId}/comments`)
          .set("Authorization", `Bearer ${authToken}`)
          .send({ content: "Test Comment" });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.content).toBe("Test Comment");
      });

      it("should list comments of a post", async () => {
        const response = await request
          .get(`/api/v1/posts/${postId}/comments`)
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });
});

const request = require("./setup");

describe("Post Routes", () => {
  let authToken;
  let postId;

  beforeAll(async () => {
    // Registra um usuário e obtém o token
    const response = await request.post("/api/v1/auth/register").send({
      name: "Post Test User",
      username: "posttester",
      password: "password123",
    });

    authToken = response.body.token;
  });

  test("Should create a new post", async () => {
    const response = await request
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test Post",
        content: "Test Content",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Post");
    postId = response.body.id;
  });

  test("Should list all posts", async () => {
    const response = await request
      .get("/api/v1/posts")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Should update post", async () => {
    const response = await request
      .put(`/api/v1/posts/${postId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  test("Should delete post", async () => {
    const response = await request
      .delete(`/api/v1/posts/${postId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(204);
  });
});

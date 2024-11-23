const request = require("./setup");

describe("Auth Routes", () => {
  const testUser = {
    name: "Test User",
    username: "testuser",
    password: "password123",
  };

  let authToken;

  test("Should register a new user", async () => {
    const response = await request.post("/api/v1/auth/register").send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("username", testUser.username);
  });

  test("Should login with registered user", async () => {
    const response = await request.post("/api/v1/auth/login").send({
      username: testUser.username,
      password: testUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    authToken = response.body.token;
  });

  test("Should not login with wrong password", async () => {
    const response = await request.post("/api/v1/auth/login").send({
      username: testUser.username,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });
});

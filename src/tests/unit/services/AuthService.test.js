const AuthService = require("../../../services/AuthService");
const User = require("../../../models/mongodb/User");
const mongoose = require("mongoose");

describe("AuthService", () => {
  const mockUser = {
    name: "Test User",
    username: "testuser",
    password: "password123",
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("register", () => {
    it("should create a new user successfully", async () => {
      const result = await AuthService.register(mockUser);

      expect(result).toHaveProperty("user");
      expect(result).toHaveProperty("token");
      expect(result.user.username).toBe(mockUser.username);
    });

    it("should not allow duplicate usernames", async () => {
      await AuthService.register(mockUser);

      await expect(AuthService.register(mockUser)).rejects.toThrow(
        "Username já está em uso"
      );
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await AuthService.register(mockUser);
    });

    it("should login successfully with correct credentials", async () => {
      const result = await AuthService.login({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(result).toHaveProperty("token");
      expect(result.user.username).toBe(mockUser.username);
    });

    it("should fail with incorrect password", async () => {
      await expect(
        AuthService.login({
          username: mockUser.username,
          password: "wrongpassword",
        })
      ).rejects.toThrow("Credenciais inválidas");
    });
  });
});

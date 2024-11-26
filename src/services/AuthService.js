const jwt = require("jsonwebtoken");
const User = require("../models/mongodb/User");

class AuthService {
  async register(userData) {
    const { name, username, password } = userData;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username já está em uso");
    }

    const user = new User({
      name,
      username,
      password,
    });

    await user.save();

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
      token,
    };
  }

  async login(credentials) {
    const { username, password } = credentials;

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Credenciais inválidas");
    }

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
      token,
    };
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
}

module.exports = new AuthService();

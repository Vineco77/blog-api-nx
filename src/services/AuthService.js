const jwt = require("jsonwebtoken");
const User = require("../models/mongodb/User");

class AuthService {
  async register(userData) {
    const { name, username, password } = userData;

    // Verifica se o username já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username já está em uso");
    }

    // Cria o novo usuário
    const user = new User({
      name,
      username,
      password,
    });

    await user.save();

    // Gera o token JWT
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

    // Busca o usuário
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    // Verifica a senha
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Credenciais inválidas");
    }

    // Gera o token JWT
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

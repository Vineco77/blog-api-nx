const jwt = require("jsonwebtoken");
const User = require("../models/mongodb/User");

class AuthController {
  async register(req, res) {
    try {
      const { name, username, password } = req.body;

      // Verifica se o username já existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username já está em uso" });
      }

      // Cria o novo usuário
      const user = new User({
        name,
        username,
        password,
      });

      await user.save();

      // Gera o token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Busca o usuário
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Verifica a senha
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.json({
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

module.exports = new AuthController();

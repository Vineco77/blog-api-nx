const jwt = require("jsonwebtoken");
const User = require("../models/mongodb/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // Verifica se o header começa com "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifica se o usuário ainda existe
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new Error();
      }

      // Adiciona o usuário e token à requisição
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido ou expirado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro na autenticação" });
  }
};

module.exports = auth;

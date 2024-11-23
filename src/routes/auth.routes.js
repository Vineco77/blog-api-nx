const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Nome é obrigatório"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username é obrigatório")
      .isLength({ min: 3 })
      .withMessage("Username deve ter no mínimo 3 caracteres"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter no mínimo 6 caracteres"),
  ],
  AuthController.register
);

router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username é obrigatório"),
    body("password").trim().notEmpty().withMessage("Senha é obrigatória"),
  ],
  AuthController.login
);

module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const PostController = require("../controllers/PostController");
const CommentController = require("../controllers/CommentController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(auth);

// Rotas de Posts
router.post(
  "/posts",
  [
    body("title").trim().notEmpty().withMessage("Título é obrigatório"),
    body("content").trim().notEmpty().withMessage("Conteúdo é obrigatório"),
  ],
  PostController.create
);

router.get("/posts", PostController.list);
router.get("/posts/:id", PostController.getById);

router.put(
  "/posts/:id",
  [
    body("title").trim().notEmpty().withMessage("Título é obrigatório"),
    body("content").trim().notEmpty().withMessage("Conteúdo é obrigatório"),
  ],
  PostController.update
);

router.delete("/posts/:id", PostController.delete);

// Rotas de Comentários
router.post(
  "/posts/:postId/comments",
  [body("content").trim().notEmpty().withMessage("Conteúdo é obrigatório")],
  CommentController.create
);

router.get("/posts/:postId/comments", CommentController.listByPost);
router.delete("/comments/:id", CommentController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

// CRUD usuários
router.get("/users", UserController.buscarTodos);
router.get("/user/:id", UserController.buscarUm);
router.post("/user", UserController.inserir);
router.put("/user/:id", UserController.alterar);
router.delete("/user/:id", UserController.excluir);

// Autenticação
router.post("/signin", AuthController.signin);
// router.get("/logout", AuthController.logout);
router.get("/validate/:id/", AuthController.buscarToken);

module.exports = router;

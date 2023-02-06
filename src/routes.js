const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");

router.get("/users", UserController.buscarTodos);
router.get("/user/:id", UserController.buscarUm);
router.post("/user", UserController.inserir);
router.put("/user/:id", UserController.alterar);
router.delete("/user/:id", UserController.excluir);

module.exports = router;

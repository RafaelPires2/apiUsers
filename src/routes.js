const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");

router.get("/users", UserController.buscarTodos);
router.get("/user/:id", UserController.buscarUm);
router.post("/user", UserController.inserir);

module.exports = router;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

// Autenticação
app.post("/auth/login", AuthController.login);

// CRUD usuários
app.get("/user", UserController.index);
app.get("/user/:id", UserController.show);
app.post("/user", UserController.create);
app.put("/user/:id", UserController.update);
app.delete("/user/:id", UserController.delete);

app.listen(3000);

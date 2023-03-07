const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };

    let users = await UserService.buscarTodos();

    for (let i in users) {
      json.result.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        token: users[i].token,
      });
    }
    res.json(json);
  },
  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let user = await UserService.buscarUm(id);

    if (user) {
      json.result = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
    res.json(json);
  },

  inserir: (req, res) => {
    let json = { error: "", result: {} };
    let name = req.body.name;
    let email = req.body.email;

    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      if (name && email && hash) {
        let UserId = await UserService.inserir(name, email, hash);
        json.result = {
          id: UserId,
          name,
          email,
        };
      } else {
        json.error = "Campos não enviados";
      }
      return res.json(json);
    });
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (id && name && email && password) {
      await UserService.alterar(id, name, email, password);
      json.result = {
        id,
        name,
        email,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },

  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await UserService.excluir(req.params.id);

    res.json(json);
  },
};

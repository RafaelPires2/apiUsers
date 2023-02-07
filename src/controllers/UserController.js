const UserService = require("../services/UserService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };

    let users = await UserService.buscarTodos();

    for (let i in users) {
      json.result.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
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

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (name && email && password) {
      let UserId = await UserService.inserir(name, email, password);
      json.result = {
        id: UserId,
        name,
        email,
        password,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
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
        password,
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

  buscarToken: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let user = await UserService.buscarToken(id);

    if (user) {
      json.result = {
        token: user.token,
      };
    }
    res.json(json);
  },
};

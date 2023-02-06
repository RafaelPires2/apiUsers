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
};

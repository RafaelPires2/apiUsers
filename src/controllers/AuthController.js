const UserService = require("../services/UserService");

module.exports = {
  signin: async (req, res) => {
    let json = { error: "", result: {} };

    let { email, password } = req.body;
    let user = await AuthService.login(email, password);

    if (user) {
      json.result = user;
    }
    return res.json(json);
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

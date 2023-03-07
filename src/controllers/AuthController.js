const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res) => {
    let { email, password } = req.body;
    let result = await AuthService.login(email, password);

    return res.json(result);
  },

  buscarToken: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let token = await AuthService.generateToken(id);

    if (token) {
      json.result = {
        token: user.token,
      };
    }
    res.json(json);
  },

  verificarToken: async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Não autorizado",
      });
    }

    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: "Token não válido.",
      });
    }
  },

  rotaAutenticada: async (req, res) => {
    res.status(200).json({
      statusCode: 200,
      message: "Rota autenticada",
    });
  },
};

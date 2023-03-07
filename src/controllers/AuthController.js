const jwt = require("jsonwebtoken");
const response = require("../utils/ResponseHandler");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  login: async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.SECRET_KEY
        );
        return response.ResponseSuccess(res, { user, token });
      } else {
        response.ResponseError(res, "Senha incorreta", 400);
      }
    } else {
      response.ResponseError(res, "Usuário não encontrado", 404);
    }
  },
};

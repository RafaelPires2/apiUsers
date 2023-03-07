const User = require("../models/User");
const bcrypt = require("bcrypt");
const response = require("../utils/ResponseHandler");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      return response.ResponseSuccess(res, users);
    } catch (error) {
      response.ResponseError(res, "Erro ao retornar usuários", 500);
    }
  },

  show: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (user) return response.ResponseSuccess(res, user);

      response.ResponseError(res, "Usuário não encontrado", 404);
    } catch (error) {
      response.ResponseError(res, "Erro ao retornar usuários", 500);
    }
  },

  create: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      const data = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      };
      const user = await User.create(data);
      delete user.password;

      return response.ResponseSuccess(res, user);
    } catch (error) {
      if (error.errors[0].message === "email must be unique") {
        response.ResponseError(
          res,
          "Já existe uma conta cadastrada com este e-mail.",
          401
        );
      } else {
        response.ResponseError(res, "Erro ao cadastrar usuário", 500);
      }
    }
  },

  update: async (req, res) => {
    try {
      const data = req.body;

      delete data.id;
      delete data.password;
      delete data.createdAt;

      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      user.set(req.body);
      await user.save();
      return response.ResponseSuccess(res, user);
    } catch (error) {
      response.ResponseError(res, "Erro ao atualizar usuário", 500);
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) {
        response.ResponseError(res, "A sua conta já foi excluída.", 400);
      } else {
        await user.destroy();
        return response.ResponseSuccess(
          res,
          "A sua conta foi excluída com sucesso."
        );
      }
    } catch (error) {
      response.ResponseError(res, "Erro ao excluir sua conta.", 500);
    }
  },
};

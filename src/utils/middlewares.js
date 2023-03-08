module.exports = {
  verifyToken: async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
      response.ResponseError(
        res,
        "Não autorizado. Tente fazer login novamente.",
        401
      );
    }

    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch (error) {
      response.ResponseError(res, "Erro ao validar credenciais", 500);
    }
  },
  accountOwner: async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];
  },
};

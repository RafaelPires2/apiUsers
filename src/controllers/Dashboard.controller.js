module.exports = {
    index: async (req, res) => {
        res.status(200).json({
          statusCode: 200,
          message: "Rota autenticada",
        });
      },
}
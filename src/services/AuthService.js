const db = require("../db");

module.exports = {
  login: (email, password) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          if (results.length > 0) {
            aceito(results[0]);
          } else false;
        }
      );
    });
  },
};

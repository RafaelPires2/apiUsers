const db = require("../db");

module.exports = {
  buscarTodos: () => {
    return new Promise((aceito, rejeitado) => {
      db.query("SELECT * FROM users", (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },

  buscarUm: (id) => {
    return new Promise((aceito, rejeitado) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        if (results.length > 0) {
          aceito(results[0]);
        } else false;
      });
    });
  },

  inserir: (name, email, password, token) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, uuid())",
        [name, email, password, token],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results.insertId);
        }
      );
    });
  },

  alterar: (id, name, email, password) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },

  excluir: (id) => {
    return new Promise((aceito, rejeitado) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },

  buscarToken: (id) => {
    return new Promise((aceito, rejeitado) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        if (results.length > 0) {
          aceito(results[0]);
        } else false;
      });
    });
  },
};

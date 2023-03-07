const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (error, results) => {
            if (results.length > 0) {
              bcrypt.compare(
                password,
                results[0].password,
                function (err, isEqual) {
                  if (isEqual) {
                    const token = jwt.sign(
                      { id: results[0].id },
                      process.env.SECRET,
                      {
                        expiresIn: "24h",
                      }
                    );

                    // Oculta o campo de password
                    const user = results[0];
                    delete user.password;

                    resolve({ user, token });
                  } else {
                    resolve({ error: "Senha não corresponde" });
                  }
                  return;
                }
              );
            } else {
              resolve({ error: "Email não corresponde" });
              return;
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },

  generateToken: (userId) =>
    jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "24h" }),
};

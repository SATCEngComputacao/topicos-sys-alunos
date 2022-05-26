const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b";

const usuarioLogin = {
  id: 100,
  username: "lucas.ferreira",
  password: "123456",
  type: "admin",
  sub: 100,
};

const token = jwt.sign(usuarioLogin, TOKEN_SECRET);

console.log(`token:`, token);

const { encryptSHA256 } = require("../auth");
const { Usuario } = require("../models");

Usuario.create({
  name: "Lucas Ferreira",
  email: "lucas.ferreira@satc.edu.br",
  password: encryptSHA256("123456"),
  type: "admin",
});

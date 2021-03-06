const router = require("express").Router();

const usuariosController = require("../controllers/usuarios");
const upload = require("../upload");

// group => /usuarios
router.get("/seed-usuario", usuariosController.seedUsuario);
router.post("/login", usuariosController.checkLogin);

// exporting routes to use in app
module.exports = router;

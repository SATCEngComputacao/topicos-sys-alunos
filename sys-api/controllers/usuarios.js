const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../env");
const { encryptSHA256 } = require("../auth");
const { Usuario } = require("../models");

exports.seedUsuario = async (req, res) => {
  const usuarios = await Usuario.findAll();
  if (!usuarios || !usuarios.length) {
    await Usuario.create({
      name: "Prof. Lucas Ferreira",
      email: "lucas.ferreira@satc.edu.br",
      password: encryptSHA256("123456"),
      type: "admin",
    });

    res.json({ success: true });
    return;
  }

  res.json({ success: false });
};

exports.checkLogin = async (req, res) => {
  // recebendo o e-mail e senha enviado para login
  const { email, password } = req.body;

  // buscando o usuário no banco com base no e-mail e senha informado
  const usuario = await Usuario.findOne({
    attributes: ["id", "name", "email", "type"],
    where: { email, password: encryptSHA256(password) },
    raw: true,
  });

  if (!!usuario) {
    // caso o usuário tenha sido encontrado com sucesso, devemos
    // gerar o web token JWT e retornar como sucesso
    const token = jwt.sign({ ...usuario, sub: usuario.id }, TOKEN_SECRET);

    // montando o retorno de sucesso após login
    res.json({
      usuario,
      token,
      success: true,
      error: false,
    });
  } else {
    // retornamos o código HTTP 401 equivalente a "Unauthorized"
    // para indicar que não foi possível logar este usuário
    res.status(401).json({ error: "Usuário e/ou Senha inválido(s)" });
  }
};

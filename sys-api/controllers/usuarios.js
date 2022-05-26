const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../env");
const { encryptSHA256 } = require("../auth");
const { Usuario } = require("../models");

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

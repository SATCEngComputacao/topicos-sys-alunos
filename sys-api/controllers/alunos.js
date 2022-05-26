const { Aluno, Curso } = require("../models");

exports.listAll = async (req, res) => {
  // console.log(`olha tem alguém logado`, req.auth);

  try {
    const alunos = await Aluno.findAll({
      order: [["name", "ASC"]],
      include: Curso,
    });

    res.json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await Aluno.findOne({
      where: { id },
    });

    if (!!aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: "Aluno não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  const avatar = !!req.file ? req.file.filename : null;

  try {
    const newAluno = await Aluno.create({
      name: req.body.name,
      email: req.body.email,
      cursoId: req.body.cursoId || 1,
      avatar,
    });

    res.json(newAluno);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const avatar = !!req.file ? req.file.filename : null;

  try {
    const payload = {};
    if (!!req.body.name) {
      payload.name = req.body.name;
    }
    if (!!req.body.email) {
      payload.email = req.body.email;
    }
    if (!!req.body.cursoId) {
      payload.cursoId = req.body.cursoId;
    }
    if (!!avatar) {
      payload.avatar = avatar;
    } else if ("avatar" in req.body && !req.body.avatar) {
      payload.avatar = null;
    }

    const updatedAluno = await Aluno.update(payload, {
      where: { id },
    });

    res.json({ success: !!updatedAluno && +updatedAluno[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAluno = await Aluno.destroy({
      where: { id },
    });

    res.json({ success: !!deletedAluno });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

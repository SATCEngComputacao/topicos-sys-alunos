const { sequelize, Curso, Aluno } = require("../models");
const { Op } = require("sequelize");

exports.listAll = async (req, res) => {
  try {
    const queryCountAlunos = Aluno.queryGenerator.selectQuery(
      "Alunos",
      {
        attributes: [sequelize.fn("COUNT", "Aluno.id")],
        where: {
          cursoId: {
            [Op.col]: "Curso.id",
          },
        },
      },
      Aluno
    );

    const cursos = await Curso.findAll({
      attributes: {
        include: [[sequelize.literal("(" + queryCountAlunos.replace(/;$/, "") + ")"), "alunosCount"]],
      },
      order: [["name", "ASC"]],
      raw: true,
    });

    res.json(cursos);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await Curso.findOne({
      where: {
        id,
      },
    });

    if (!!curso) {
      res.json(curso);
    } else {
      res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const novoCurso = await Curso.create(req.body);
    res.json(novoCurso);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const updCurso = await Curso.update(req.body, {
      where: {
        id,
      },
    });

    res.json({ success: !!updCurso });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCurso = await Curso.destroy({
      where: {
        id,
      },
    });

    res.json({ success: !!deletedCurso });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

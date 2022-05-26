"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    static associate(models) {
      models.Aluno.belongsTo(models.Curso, {
        foreignKey: "cursoId",
      });
    }
  }

  Aluno.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "E-mail inválido",
          },
        },
      },
      avatar: DataTypes.STRING,
      cursoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Aluno",
    }
  );
  return Aluno;
};

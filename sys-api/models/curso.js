"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      models.Curso.hasMany(models.Aluno, {
        foreignKey: "cursoId",
      });
    }
  }
  Curso.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Curso",
    }
  );
  return Curso;
};

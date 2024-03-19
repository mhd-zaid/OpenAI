import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Recipe extends Model {
    static associate(db) {
      Recipe.hasMany(db.Quantity);
    }
  }
  Recipe.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tips: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.ENUM("FACILE","MOYEN","DIFFICILE"),
      },
      tags: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      nb_person: {
        type: DataTypes.INTEGER,
      },
      instructions: {
        type: DataTypes.JSON,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: connection,
      tableName: "Recipe",
    }
  );
  return Recipe;
}

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
      description: {
        type: DataTypes.STRING,
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
      instructions: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize: connection,
      tableName: "Recipe",
    }
  );
  return Recipe;
}

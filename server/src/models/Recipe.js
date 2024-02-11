import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Recipe extends Model {
    static associate(db) {
      Recipe.hasMany(db.Step);
      // db.Step.belongsTo(Recipe);
      // Recipe.hasMany(db.RecipeIngredient);
      // db.RecipeIngredient.belongsTo(Recipe);

      Recipe.belongsToMany(db.Ingredient, {
        through: db.RecipeIngredient
      })
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
    },
    {
      sequelize: connection,
      tableName: "Recipe",
    }
  );
  return Recipe;
}

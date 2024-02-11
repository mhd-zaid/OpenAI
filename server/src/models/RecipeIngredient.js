import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class RecipeIngredient extends Model {
    static associate(db) {
      RecipeIngredient.belongsTo(db.Recipe);
      RecipeIngredient.belongsTo(db.Ingredient);
    }
  }
  RecipeIngredient.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      unity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize: connection,
      tableName: "RecipeIngredient",
    }
  );
  return RecipeIngredient;
}

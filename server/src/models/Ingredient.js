import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Ingredient extends Model {
    static associate(db) {
      Ingredient.hasMany(db.Quantity);
    }
  }
  Ingredient.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    },
    {
      sequelize: connection,
      tableName: "Ingredient",
    }
  );
  return Ingredient;
}

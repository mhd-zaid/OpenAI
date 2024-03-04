import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Quantity extends Model {
    static associate(db) {
      Quantity.belongsTo(db.Recipe, {onDelete: "CASCADE"});
      Quantity.belongsTo(db.Ingredient, {onDelete: "CASCADE"});
    }
  }
  Quantity.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
      unit: {
        type: DataTypes.STRING,
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize: connection,
      tableName: "Quantity",
    }
  );
  return Quantity;
}

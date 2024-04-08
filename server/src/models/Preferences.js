import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Preferences extends Model {
    static associate(db) {
      db.User.hasMany(Preferences);
      db.Ingredient.hasMany(Preferences);
      Preferences.belongsTo(db.User);
      Preferences.belongsTo(db.Ingredient)
    }
  }
  Preferences.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true },
        isLiked: { type: DataTypes.BOOLEAN, allowNull: true },
        isAllergic: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
      sequelize: connection,
      tableName: "Preferences",
    }
  );
  return Preferences;
}
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
        isLiked: { type: DataTypes.BOOLEAN, allowNull: false },
        isAllergic: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize: connection,
      tableName: "Preferences",
    }
  );
  return Preferences;
}
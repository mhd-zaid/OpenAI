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
        preferences: {type: DataTypes.ENUM("AIME","AIME PAS","NEUTRE") },
        allergies : {type: DataTypes.BOOLEAN},
    },
    {
      sequelize: connection,
      tableName: "Preferences",
    }
  );
  return Preferences;
}
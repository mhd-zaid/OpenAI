import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Favorite extends Model {
    static associate(db) {
      db.User.hasMany(Favorite);
      db.Recipe.hasMany(Favorite);
      Favorite.belongsTo(db.User);
      Favorite.belongsTo(db.Recipe)
    }
  }
  Favorite.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
    },
    {
      sequelize: connection,
      tableName: "Favorite",
    }
  );
  return Favorite;
}
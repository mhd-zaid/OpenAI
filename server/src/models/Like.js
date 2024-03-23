import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Like extends Model {
    static associate(db) {
        Like.belongsTo(db.Recipe, {onDelete: "CASCADE"});
        Like.belongsTo(db.User, {onDelete: "CASCADE"});
        db.Recipe.hasMany(Like);
    }
  }
  Like.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4}
    },
    {
      sequelize: connection,
      tableName: "Like",
    }
  );
  return Like;
}

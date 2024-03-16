import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Comment extends Model {
    static associate(db) {
      db.User.hasMany(Comment);
      db.Recipe.hasMany(Comment);
      Comment.belongsTo(db.User);
      Comment.belongsTo(db.Recipe)
    }
  }
  Comment.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize: connection,
      tableName: "Comment",
    }
  );
  return Comment;
}
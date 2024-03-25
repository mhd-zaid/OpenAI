import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Rating extends Model {
    static associate(db) {
      Rating.belongsTo(db.Recipe, {onDelete: "CASCADE"});
      Rating.belongsTo(db.User, {onDelete: "CASCADE"});
        db.Recipe.hasMany(Rating);
    }
  }
  Rating.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
        rating: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
            max: 5,
            isFloat: true,
            isIn: [[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]]
          }
        }
      },
    {
      sequelize: connection,
      tableName: "Rating",
    }
  );
  return Rating;
}

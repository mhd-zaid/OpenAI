import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Step extends Model {
  }
  Step.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize: connection,
      tableName: "Step",
    }
  );
  return Step;
}

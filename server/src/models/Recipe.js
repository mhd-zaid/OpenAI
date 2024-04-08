import { Model, DataTypes } from "sequelize";

export default function (connection) {
    class Recipe extends Model {
        static associate(db) {
            Recipe.hasMany(db.Quantity);
            Recipe.hasMany(db.Comment);
        }
    }
    Recipe.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            tips: {
                type: DataTypes.STRING,
            },
            level: {
                type: DataTypes.ENUM("FACILE","MOYEN","DIFFICILE"),
            },
            tags: {
                type: DataTypes.JSON,
            },
            duration: {
                type: DataTypes.INTEGER,
            },
            nb_person: {
                type: DataTypes.INTEGER,
            },
            instructions: {
                type: DataTypes.JSON,
            },
            image: {
                type: DataTypes.STRING,
            },
            url: {
                type: DataTypes.STRING,
            },
            average_rating: {
                type: DataTypes.FLOAT,
            },
            nb_rating: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize: connection,
            tableName: "Recipe",
        }
    );
    return Recipe;
}

import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config({path: ".env.local"});
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    logging: false, // Désactive les logs Sequelize
});

export default sequelize;

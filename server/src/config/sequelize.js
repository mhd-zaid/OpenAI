import { Sequelize } from 'sequelize';

const connection = new Sequelize(process.env.POSTGRES_URI, {
    logging: false, // Désactive les logs Sequelize
});

await connection.authenticate();
console.log('Connected to postgres');
connection.sync();

export default connection;

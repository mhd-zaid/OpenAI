import { Sequelize } from 'sequelize';
import User from '../models/User.js';

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    logging: false, // Désactive les logs Sequelize
});

try {
    sequelize.authenticate().then(() => {
        console.log('Connected to postgres');
        User(sequelize).sync()
            .then(() => console.log('Table User créer avec succès'))
            .catch(error => console.log('This error occured', error));
    });
} catch (e) {
    console.error(`Error connecting to postgres: ${e}`);
}

export default sequelize;
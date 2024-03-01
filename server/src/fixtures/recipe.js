import { v4 as uuidv4 } from 'uuid';

const levelEnum = ['FACILE', 'MOYEN', 'DIFFICILE'];
const getRandomElement = (array) =>
	array[Math.floor(Math.random() * array.length)];

const recipesFixture = [
    {
        id: uuidv4(),
        title: "Bûche aux fruits exotiques et chocolat noisettes Nestlé Dessert",
        description: null,
        tips: null,
        time: 90,
        level: getRandomElement(levelEnum),
        tags: "dessert",
    }

];

export default recipesFixture;
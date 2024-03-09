import { v4 as uuidv4 } from 'uuid';

const levelEnum = ['FACILE', 'MOYEN', 'DIFFICILE'];
const getRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];

const recipesFixture = [
  {
    id: uuidv4(),
    title: 'Bûche aux fruits exotiques et chocolat noisettes Nestlé Dessert',
    description: null,
    tips: null,
    time: 90,
    level: getRandomElement(levelEnum),
    tags: 'dessert',
    instructions: null,
  },
  {
    id: uuidv4(),
    title: 'Tarte tatin aux pommes et caramel beurre salé',
    description: null,
    tips: null,
    time: 60,
    level: getRandomElement(levelEnum),
    tags: 'dessert',
    instructions: null,
  },
  {
    id: uuidv4(),
    title: 'Omelette aux tomates et au fromage',
    description: null,
    tips: null,
    time: 15,
    level: getRandomElement(levelEnum),
    tags: 'plat',
    instructions: null,
  },
  {
    id: uuidv4(),
    title: 'Poulet rôti aux herbes de Provence',
    description: null,
    tips: null,
    time: 90,
    level: getRandomElement(levelEnum),
    tags: 'plat',
    instructions: null,
  },
  {
    id: uuidv4(),
    title: 'Pâtes à la carbonara',
    description: null,
    tips: null,
    time: 30,
    level: getRandomElement(levelEnum),
    tags: 'plat',
    instructions: null,
  },
];

export default recipesFixture;

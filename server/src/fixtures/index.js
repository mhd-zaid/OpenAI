import connection from '../config/sequelize.js';
// Fixtures
import ingredientFixture from './ingredient.js';
import recipeFixture from './recipe.js';
import db from '../models/index.js';

const loadIngredients = async () => {
  const model = (await import('../models/Ingredient.js')).default(connection);
  try {
    await Promise.all(
      ingredientFixture.map(ingredient => model.create(ingredient)),
    );
    console.log('Ingredients loaded');
  } catch (err) {
    console.error(err);
  }
};

const loadRecipes = async () => {
  const model = (await import('../models/Recipe.js')).default(connection);
  try {
    await Promise.all(recipeFixture.map(recipe => model.create(recipe)));
    console.log('Recipes loaded');
  } catch (err) {
    console.error(err);
  }
};
const getRecipeByName = async name => {
  const model = (await import('../models/Recipe.js')).default(connection);
  try {
    const recipe = await model.findOne({ where: { title: name } });
    return recipe;
  } catch (err) {
    console.error(err);
  }
};

const getIngredientByName = async name => {
  const model = (await import('../models/Ingredient.js')).default(connection);
  try {
    const ingredient = await model.findOne({ where: { name: name } });
    return ingredient;
  } catch (err) {
    console.error(err);
  }
};

const loadQuantity = async () => {
  const model = db.Quantity;
  try {
    let recipe = await getRecipeByName('Omelette aux tomates et au fromage');
    const ingredient = await getIngredientByName('Fromage')
    let quantities = [
      {
        quantity: 2,
        unit: null,
        IngredientId: ingredient.id,
        RecipeId: recipe.id,
      },
      {
        quantity: 50,
        unit: 'g',
        IngredientId: ingredient.id,
        RecipeId: recipe.id,
      },
      {
        quantity: 1,
        unit: null,
        IngredientId: ingredient.id,
        RecipeId: recipe.id,
      },
    ];
    await Promise.all(quantities.map(quantity => model.create(quantity)));
    console.log('Quantities loaded');
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  try {
    await loadIngredients();
    await loadRecipes();
    await loadQuantity();
  } catch (error) {
    console.error(error);
  } finally {
    connection.close();
  }
};

main();

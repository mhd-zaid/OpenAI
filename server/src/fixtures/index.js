import connection from '../config/sequelize.js';
// Fixtures
import ingredientFixture from './ingredient.js';
import recipeFixture from './recipe.js';
import quantityFixture from './quantity.js';
import db from '../models/index.js';
import usersFixture from './user.js';
import commentsFixture from './comment.js';
import _ from 'lodash';
import {uuidv4} from "uuidv7";

const loadIngredients = async () => {
  const model = (await import('../models/Ingredient.js')).default(connection);
  try {
    await Promise.all(
      ingredientFixture.map(ingredient => {
        model.create(ingredient)
      }),
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

const loadUsers = async () => {
  const model = (await import('../models/User.js')).default(connection);
  try {
    await Promise.all(
      usersFixture.map(user => model.create(user)),
    );
    console.log('Users loaded');
  } catch (err) {
    console.error(err);
  }

}

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
    await Promise.all(quantityFixture.map(async quantity => {
      const ingredient = await getIngredientByName(quantity.Ingredient);
      const recipe = await getRecipeByName(quantity.Recipe);
      if(!ingredient) console.log("ingredient non trouvé", quantity);
        if(!recipe) console.log("recette non trouvée", quantity);
      return model.create({
        quantity: quantity.quantity,
        unit: quantity.unit,
        IngredientId: ingredient.id,
        RecipeId: recipe.id,
      });
    }));
    console.log('Quantities loaded');
  } catch (err) {
    console.error(err);
  }
};

const loadComments = async () => {
  const model = db.Comment;
  const recipes = await db.Recipe.findAll();
  const users = await db.User.findAll();
  try {
    for (const recipe of recipes) {
      const numComments = _.random(2, 13);
      const randomUsers = _.sampleSize(users, numComments);
      for (let i = 0; i < numComments; i++) {
        await model.create({
          id: uuidv4(),
          comment: commentsFixture[i].comment,
          rating: commentsFixture[i].rating,
          UserId: randomUsers[i].id,
          RecipeId: recipe.id,
        });
      }
    }
    console.log('Comments loaded');
  } catch (err) {
    console.error(err);
  }
};

const updateRecipeRate = async () => {
  const model = db.Recipe;
  try {
    await Promise.all(recipeFixture.map(async recipe => {
      const comments = await db.Comment.findAll();
      const recipes = await model.findAll();
      for (const recipe1 of recipes) {
        const recipeComments = comments.filter(comment => comment.RecipeId === recipe1.id);
        const rate = recipeComments.reduce((acc, comment) => acc + comment.rating, 0) / recipeComments.length;
        await recipe1.update({ average_rating: Math.round(rate).toFixed(1)
          , nb_rating: recipeComments.length });
      }
    }));
  } catch (err) {
    console.error(err);
  }
}

const loadPrefences = async () => {
  const model = db.Preferences;
  const ingredients = await db.Ingredient.findAll();
  const users = await db.User.findAll();
  try {
    for (const user of users) {
      const nbAllergies = _.random(0, 10);
      const randomIngredients = _.sampleSize(ingredients, nbAllergies);
      for (let i = 0; i < nbAllergies; i++) {
        await model.create({
          id: uuidv4(),
          isLiked: _.sample([true, false]),
          isAllergic: _.sample([true, false]),
          UserId: user.id,
          IngredientId: randomIngredients[i].id,
        });
      }
    }
    console.log('Preferences loaded');
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  try {
    // await loadIngredients();
    // await loadRecipes();
    // await loadQuantity();
    // await loadUsers();
    // await loadComments();
    // await updateRecipeRate()
    await loadPrefences();
  } catch (error) {
    console.error(error);
  } finally {
    connection.close();
  }
};

main();

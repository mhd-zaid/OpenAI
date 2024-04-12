import connection from '../config/sequelize.js';
// Fixtures
import ingredientFixture from './ingredient.js';
import recipeFixture from './recipe.js';
import quantityFixture from './quantity.js';
import commentsFixture from './comment.js';
import db from '../models/index.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import {uuidv4} from "uuidv7";
import usersFixture from "./user.js";

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
    const nbUsers = 13;
    for (let i = 0; i < nbUsers; i++) {
      const userName = faker.internet.userName();
      await model.create({
        id: uuidv4(),
        userName: userName,
        email: `${userName}@mail.fr`,
        password: 'MotDePasse123!',
        role: 'user',
        isVerified: true,
        loginAttempts: 0,
        token: 'exampleToken13',
        isActive: true,
      });
    }
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
        let rating;
        if (i < numComments / 3) {
          rating = 2 + Math.random(); // rating between 2 and 3
        } else if (i < 2 * numComments / 3) {
          rating = 3 + Math.random(); // rating between 3 and 4
        } else {
          rating = 4 + Math.random(); // rating between 4 and 5
        }
        await model.create({
          id: uuidv4(),
          comment: commentsFixture[i].comment,
          rating: parseFloat(rating.toFixed(1)),
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
        await recipe1.update({ average_rating: parseFloat(rate.toFixed(1)), nb_rating: recipeComments.length });
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
          isLiked: _.sample([true, false, null]),
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

const loadFavorites = async () => {
  const model = db.Favorite;
  const recipes = await db.Recipe.findAll();
  const users = await db.User.findAll();
  try {
    for (const user of users) {
      const nbFavorites = _.random(0, 10);
      const randomRecipes = _.sampleSize(recipes, nbFavorites);
      for (let i = 0; i < nbFavorites; i++) {
        await model.create({
          id: uuidv4(),
          UserId: user.id,
          RecipeId: randomRecipes[i].id,
        });
      }
    }
    console.log('Favorites loaded');
  } catch (err) {
    console.error(err);
  }

}

const main = async () => {
  try {
    await loadIngredients();
    await loadRecipes();
    await loadQuantity();
    await loadUsers();
    await loadComments();
    await updateRecipeRate()
    await loadPrefences();
    await loadFavorites();
  } catch (error) {
    console.error(error);
  } finally {
    connection.close();
  }
};

main();

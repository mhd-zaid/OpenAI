import connection from '../config/sequelize.js';
// Fixtures
import ingredientFixture from './ingredient.js';
import recipeFixture from './recipe.js';
import quantityFixture from './quantity.js';
import db from '../models/index.js';
import usersFixture from './user.js';
import commentsFixture from './comment.js';

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

const getUsersByUsername = async userName => {
  const model = (await import('../models/User.js')).default(connection);
  try {
    const user = await model.findOne({ where: { userName: userName } });
    return user;
  }catch (err) {
    console.error(err);
  }
};

const loadQuantity = async () => {
  const model = db.Quantity;
  try {
    await Promise.all(quantityFixture.map(async quantity => {
      const ingredient = await getIngredientByName(quantity.Ingredient);
      const recipe = await getRecipeByName(quantity.Recipe);
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
  try {
    await Promise.all(commentsFixture.map(async comment => {
      const user = await getUsersByUsername(comment.User);
      const recipe = await getRecipeByName(comment.Recipe);
      return model.create({
        id: comment.id,
        comment: comment.comment,
        rating: comment.rating,
        UserId: user.id,
        RecipeId: recipe.id,
      });
    }));
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
        await recipe1.update({ average_rating: rate, nb_rating: recipeComments.length });
      }
    }));
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
  } catch (error) {
    console.error(error);
  } finally {
    connection.close();
  }
};

main();

import OpenAI from 'openai';
import db from '../models/index.js';

const recommendationPrompt = "Ce qui suit est une demande pour fournir des recettes similaires à une recette spécifique.\
La recette est similaire si le titre de la recette contient le même mot. Elle est aussi similaire si la recette contient le même ingrédient.\
La réponse doit contenir une liste d'objets JSON représentant les recettes similaires disponibles dans la base de données.\
Si des recettes similaires sont disponibles pour la recette spécifiée, elles doivent être incluses dans la réponse;\
La réponse doit respecter ce format la sans préfixe ni suffixe uniquement comme ceci: [{id: 15215, average_rating: 20.5, nb_rating: 104, title:'pates', url: 'pate-5555', image: `pate.jpeg`}];\
sinon, la réponse doit être un objet JSON vide. Les recettes disponibles dans la base de données sont les suivantes : ";

class RecommendationService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async formatRecipesWithIngredients(recipes) {
    return Promise.all(recipes.map(async recipe => {
      const ingredients = await Promise.all(recipe.Quantities.map(async quantity => {
        const ingredient = await db.Ingredient.findByPk(quantity.IngredientId);
        return { id: ingredient.id, name: ingredient.name };
      }));
      return {
        id: recipe.id,
        title: recipe.title,
        url: recipe.url,
        average_rating: recipe.average_rating,
        nb_rating: recipe.nb_rating,
        image: recipe.image,
        ingredients: ingredients
      };
    }));
  }

  async getOpenAICompletion(recipeId) {
    const allRecipes = await db.Recipe.findAll({
      include: [db.Quantity]
    });

    const formattedRecipes = await this.formatRecipesWithIngredients(allRecipes);

    const targetRecipe = formattedRecipes.find(recipe => recipe.id === recipeId);

    const context = [
      { role: 'system', content: recommendationPrompt + JSON.stringify(formattedRecipes) },
      { role: 'user', content: "Je veux plusieurs recettes similaires à la recette suivante : " + JSON.stringify(targetRecipe) }
    ];

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: context,
      temperature: 0.2,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion;
  }
}

export default RecommendationService;

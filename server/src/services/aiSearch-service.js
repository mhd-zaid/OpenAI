import OpenAI from 'openai';
import db from '../models/index.js';

import quantity from '../routes/quantity.js';
const searchPrompt =
  "Ce qui suit est une demande basée sur les recettes disponibles dans la base de données.Ca peut être une brève description ou un mot-clé existant dans les recettes ou ingrédients.\
La réponse doit inclure uniquement les recettes qui correspondent aux noms de recette, aux nom de l'ingredient et aux quantités spécifiées.\
Si une recette correspond aux critères donnés, l'objet JSON contenant cette recette doit être retourné à ce format la sans les ingrédients, Exemple : [{title : 'patte', url: 'patte-123'},...] ; sinon, un tableau vide doit être retourné.\
Les recettes disponibles dans la base de données sont les suivantes : ";

class AiSearchService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(prompt) {
    const context = [];

    const allQuantities = await db.Quantity.findAll({
      include: [db.Recipe, db.Ingredient],
    });
    const formattedRecipes = await this.formatRecipesWithIngredients(
      allQuantities,
    );

    const searchPromptWithData =
      searchPrompt + JSON.stringify(formattedRecipes);

    context.push({
      role: 'system',
      content: searchPromptWithData,
    });
    context.push({ role: 'user', content: prompt });
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: context,
      temperature: 0.2,
      frequency_penalty: 0,
      presence_penalty: 0,
      seed: 0,
      response_format: { type: 'json_object' },
    });

    return completion;
  }

  async formatRecipesWithIngredients(quantities) {
    const allQuantitiesFormatted = Promise.all(
      quantities.map(async quantity => {
        const ingredient = { name: quantity.Ingredient.name };
        return {
          title: quantity.Recipe.title,
          url: quantity.Recipe.url,
          ingredient,
        };
      }),
    );

    return (await allQuantitiesFormatted).reduce((acc, quantity) => {
      const existingRecipe = acc.find(item => item.title === quantity.title);

      if (existingRecipe) {
        existingRecipe.ingredient.push(quantity.ingredient);
      } else {
        acc.push({
          title: quantity.title,
          url: quantity.url,
          ingredient: [quantity.ingredient],
        });
      }

      return acc;
    }, []);
  }
}

export default AiSearchService;

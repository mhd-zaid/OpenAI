import OpenAI from 'openai';
import db  from '../models/index.js';
let recommendationPrompt = "Ce qui suit est une demande pour fournir des recettes similaires à une recette spécifique.\
La recette est similaire si le title de la recette contient le même mot. Elle est aussi similaire si la recette contient le même ingrédient.\
La réponse doit contenir une liste d'objets JSON représentant les recettes similaires disponibles dans la base de données.\
Si des recettes similaires sont disponibles pour la recette spécifiée, elles doivent être incluses dans la réponse;\
La réponse doit respecter ce format la sans préfixe ni suffixe uniquement comme ceci:  [{id: 15215, average_rating: 20.5, nb_rating: 104, title:'pates'} ] ;\
sinon, la réponse doit être un objet JSON vide. Les recettes disponibles dans la base de données sont les suivantes : ";

class RecommendationService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(recipeId) {
    const context = [];
    const recipes = (await db.Recipe.findAll({ include: [db.Quantity] })).map(
      recipe => {
        const { id, title, Quantities, average_rating, nb_rating } = recipe;
        const ingredients = Quantities.map( async (quantity) => {
          const ingredient = await db.Ingredient.findOne({ where: { id: quantity.IngredientId } });
          return {
            id: ingredient.dataValues.id,
            name: ingredient.dataValues.name,
          }
        });
        return { id, title, ingredients, average_rating, nb_rating };
      },
    );

    recommendationPrompt += JSON.stringify(recipes);

    const recipe = (
      await db.Recipe.findAll({
        include: [db.Quantity],
        where: { id: recipeId },
      })
    ).map(recipe => {
      const { id, title, Quantities, average_rating, nb_rating } = recipe;
      const ingredients = Quantities.map(async (quantity) => {
        const ingredient = await db.Ingredient.findOne({ where: { id: quantity.IngredientId } });
        return {
          id: ingredient.dataValues.id,
          name: ingredient.dataValues.name,
        }
      });

      return { id, title, ingredients, average_rating, nb_rating };
    });

    context.push({
      role: 'system',
      content: recommendationPrompt,
    });

    const content = "Je veux plusieurs recettes similaire a la recette suivante : " + JSON.stringify(recipe);
    context.push({ role: 'user', content: content });
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

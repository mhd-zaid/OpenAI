import OpenAI from 'openai';
import db  from '../models/index.js';
let recommendationPrompt = "Ce qui suit est une demande pour fournir des recettes similaires à une recette spécifique.\
La recette est similaire si le title de la recette contient le même mot. Elle est aussi similaire si la recette contient le même ingrédient.\
La réponse doit contenir une liste d'objets JSON représentant les recettes similaires disponibles dans la base de données.\
Si des recettes similaires sont disponibles pour la recette spécifiée, elles doivent être incluses dans la réponse;\
La réponse doit respecter ce format la sans préfixe ni suffixe uniquement comme ceci:  [{id: 15215}, ... ] ;\
sinon, la réponse doit être un objet JSON vide. Les recettes disponibles dans la base de données sont les suivantes : ";

class RecommendationService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(recipeId) {
    const context = [];
    const recipes = await db.Recipe.findAll({ include: [db.Quantity] });
    recommendationPrompt += JSON.stringify(recipes);
    const recipe = await db.Recipe.findAll({ include: [db.Quantity], where: { id: recipeId } });
    context.push({
      role: 'system',
      content: recommendationPrompt,
    });
    const content = "Je veux une recette similaire pour la recete est la suivante : " + JSON.stringify(recipe);
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

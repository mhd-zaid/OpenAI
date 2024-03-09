import OpenAI from 'openai';
import db  from '../models/index.js';
let searchPrompt = "Ce qui suit est une demande basée sur les recettes disponibles dans la base de données.\
La réponse doit inclure uniquement les recettes qui correspondent aux noms de recette et aux quantités spécifiées.\
Si une recette correspond aux critères donnés, l'objet JSON contenant cette recette doit être retourné au même format fournies; sinon, l'objet JSON retourné doit être vide.\
Les recettes disponibles dans la base de données sont les suivantes : ";

class AiSearchService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(prompt) {
    const context = [];
    const recipes = await db.Quantity.findAll({ include: [db.Recipe,db.Ingredient] });
    searchPrompt += JSON.stringify(recipes);
    context.push({
      role: 'system',
      content: searchPrompt,
    });
    context.push({ role: 'user', content: prompt });
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

export default AiSearchService;

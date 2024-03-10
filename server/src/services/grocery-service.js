import OpenAI from 'openai';
import db  from '../models/index.js';
let groceryListPrompt = "Ce qui suit est une demande pour générer une liste de courses basée sur les ingrédients et les quantités nécessaires\
pour une recette spécifique. La réponse doit contenir une liste d'objets JSON, où chaque objet représente un ingrédient nécessaire\
pour la recette, avec son nom et la quantité requise. Si la recette spécifiée est disponible dans la base de données, la liste de\
courses doit être générée en fonction de ses ingrédients, quantités et unités. La  réponse json doit être un tableau direct; sinon, la réponse doit être un objet JSON vide.";

class AiSearchService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(recipeId) {
    const context = [];
    const recipe = await db.Quantity.findAll({ include: [db.Recipe,db.Ingredient], where: { RecipeId: recipeId } });
    
    context.push({
      role: 'system',
      content: groceryListPrompt,
    });
    const content = "Génère moi une liste de courses pour la recette suivante : " + JSON.stringify(recipe);
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

export default AiSearchService;

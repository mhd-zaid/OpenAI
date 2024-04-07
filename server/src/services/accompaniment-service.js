import OpenAI from 'openai';
import db  from '../models/index.js';
let accompanimentPrompt = 'Ce qui suit est une demande pour fournir des accompagnements pour une recette spécifique.\
La réponse doit contenir une liste d\'objets JSON représentant les accompagnements recommandés.\
Au moins un accompagnement doit être inclus, mais jusqu\'à trois accompagnements peuvent être fournis au maximum.\
Si des accompagnements sont disponibles pour la recette spécifiée, ils doivent être inclus dans la réponse ;\
La réponse doit être au format JSON suivante : [{"nom": "exemple"},...] ; le tableau JSON ne doit pas avoir de nom\
sinon, la réponse doit être un tableau JSON vide.';

class AccompanimentService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getOpenAICompletion(recipeId) {
    const context = [];
    const recipe = await db.Quantity.findAll({ include: [db.Recipe,db.Ingredient], where: { RecipeId: recipeId } });
    
    context.push({
      role: 'system',
      content: accompanimentPrompt,
    });
    const content = "Donne moi des accompagnements pour la recette suivante : " + JSON.stringify(recipe);
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

export default AccompanimentService;

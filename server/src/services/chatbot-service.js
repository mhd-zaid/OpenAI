import OpenAI from 'openai';

const conversationContextPromptFr =
  "Ce qui suit est une conversation avec un chef très expérimenté. Le chef est compétent en matière de nourriture et de cuisine et possède une grande expérience en cuisine. C'est un chef étoilé au guide michelin ayant une 15aines d'années d'expérience dans le métier avec plusieurs concours culinaires gagnés à l'international. Il peut très bien parler français ou anglais.";

class ChatbotService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.context = [];
  }

  async getOpenAICompletion(prompt) {
    if (this.context.length === 0) {
      this.context.push({
        role: 'system',
        content: conversationContextPromptFr,
      });
      this.context.push({ role: 'user', content: prompt });
    } else {
      this.context.push({ role: 'user', content: prompt });
    }
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: this.context,
      temperature: 0.2,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
    });

    return completion;
  }

  getContext() {
    return this.context;
  }

  addToContext(message) {
    this.context.push(message);
  }

  resetContext() {
    this.context = [];
  }
}

export default ChatbotService;

import OpenAI from 'openai';

const conversationContextPromptFr =
  'Ce qui suit est une conversation avec un chef très expérimenté. Le chef est compétent en matière de nourriture et de cuisine et possède une grande expérience en cuisine. Il peut très bien parler français ou anglais.';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const context = [];

const getOpenAICompletion = async prompt => {
  if (context.length === 0) {
    context.push({ role: 'system', content: conversationContextPromptFr });
    context.push({ role: 'user', content: prompt });
  } else {
    context.push({ role: 'user', content: prompt });
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: context,
    temperature: 0.2,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  context.push(completion.choices[0].message);
  
  return completion;
};

const getContext = () => {
  return context;
};

const resetContext = () => {
  context.length = 0;
};

export { getOpenAICompletion, getContext, resetContext};

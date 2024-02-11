import OpenAI from 'openai';

const conversationContextPromptFr =
  'Ce qui suit est une conversation avec un chef très expérimenté. Le chef est compétent en matière de nourriture et de cuisine et possède une grande expérience en cuisine. Il peut très bien parler français ou anglais.';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getOpenAICompletion = async prompt => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: conversationContextPromptFr },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return completion;
};

export { getOpenAICompletion };

import chatbotController from '../controllers/chatbot.js';
import OpenAIService from '../services/openai-service.js';

export default function (router) {
  const openAIService = new OpenAIService();

  const { send, getCoversationContext, resetConversationContext } =
    chatbotController(
      openAIService.getOpenAICompletion.bind(openAIService),
      openAIService.getContext.bind(openAIService),
      openAIService.resetContext.bind(openAIService),
    );

  router.post('/', send);
  router.get('/context', getCoversationContext);
  router.post('/reset', resetConversationContext);
  return router;
}

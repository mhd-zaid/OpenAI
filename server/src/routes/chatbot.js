import chatbotController from '../controllers/chatbot.js';
import ChatbotService from '../services/chatbot-service.js';

export default function (router) {
  const chatbotService = new ChatbotService();

  const { send, getCoversationContext, resetConversationContext } =
    chatbotController(
      chatbotService.getOpenAICompletion.bind(chatbotService),
      chatbotService.getContext.bind(chatbotService),
      chatbotService.resetContext.bind(chatbotService),
    );

  router.post('/', send);
  router.get('/context', getCoversationContext);
  router.post('/reset', resetConversationContext);
  return router;
}

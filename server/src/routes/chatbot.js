import chatbotController from '../controllers/chatbot.js';
import { getOpenAICompletion,getContext,resetContext } from '../services/openai-service.js';
export default function (router) {
    const {send,getCoversationContext,resetConversationContext} = chatbotController(getOpenAICompletion,getContext,resetContext);
    router.post('/', send);
    router.get('/context', getCoversationContext);
    router.post('/reset', resetConversationContext);
    return router;
}
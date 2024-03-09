import aiSearchController from '../controllers/aiSearch.js';
import AiSearchService from '../services/aiSearch-service.js';

export default function (router) {
  const aiSearchService = new AiSearchService();

  const { search} =
    aiSearchController(
      aiSearchService.getOpenAICompletion.bind(aiSearchService),
    );

  router.post('/', search);
  
  return router;
}

import recommendationController from '../controllers/recommendation.js';
import RecommendationService from '../services/recommendation-service.js';

export default function (router) {
  const recommendationService = new RecommendationService();

  const { getRecommendation } =
  recommendationController(
    recommendationService.getOpenAICompletion.bind(recommendationService),
  );

  router.get("/:id", getRecommendation);
  
  return router;
}

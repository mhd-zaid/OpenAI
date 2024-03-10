import accompanimentController from '../controllers/accompaniment.js';
import AccompanimentService from '../services/accompaniment-service.js';

export default function (router) {
  const accompanimentService = new AccompanimentService();

  const { getAccompaniment } =
  accompanimentController(
    accompanimentService.getOpenAICompletion.bind(accompanimentService),
  );

  router.get("/:id", getAccompaniment);
  
  return router;
}

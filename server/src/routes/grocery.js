import groceryController from '../controllers/grocery.js';
import GroceryService from '../services/grocery-service.js';

export default function (router) {
  const groceryService = new GroceryService();

  const { list } =
  groceryController(
    groceryService.getOpenAICompletion.bind(groceryService),
  );

  router.get("/:id", list);
  
  return router;
}


import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";
import ingredientController from '../controllers/ingredient.js';

const genericRoutes = [
  // { method: 'GET', path: '/', handler: 'getAll', middlewares: [] },
  // { method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
  // { method: 'POST', path: '/', handler: 'create', middlewares: [] },
  // { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
  // { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
  // { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
];

const genericIngredientRouter = new GenericRouter(
  new GenericController(new GenericService(db.Ingredient)),
);
genericRoutes.forEach(route => {
  genericIngredientRouter.addRoute(route, route.middlewares);
});

export default router => {
  router.use('/', genericIngredientRouter.getRouter());
  router.get('/', ingredientController.getAll);
  return router;
};

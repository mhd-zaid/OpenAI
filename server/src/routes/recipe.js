import recipeController from '../controllers/recipe.js';
import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";

export default function (router) {
  const genericRoutes = [
    // { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
    // { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
  ];

  const genericRecipeRouter = new GenericRouter(
    new GenericController(new GenericService(db.Recipe)),
  );
  genericRoutes.forEach(route => {
    genericRecipeRouter.addRoute(route, route.middlewares);
  });

  router.use('/', genericRecipeRouter.getRouter());
  router.post("/", recipeController.create);
  router.get("/", recipeController.getAll);
  router.get("/:url", recipeController.getByUrl);

  return router;
}

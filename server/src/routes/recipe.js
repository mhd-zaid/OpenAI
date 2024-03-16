import recipeController from '../controllers/recipe.js';

export default function (router) {
  router.post("/", recipeController.create);
  router.get("/", recipeController.getAll);
  router.get("/:id", recipeController.getById);
  
  return router;
}

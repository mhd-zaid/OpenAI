import express from "express";
import sequelize from "./src/config/sequelize.js";
import router from "./src/config/router.js"; 
import db from "./src/models/index.js";
import GenericController from "./src/Controllers/GenericController.js";
import GenericRouter from "./src/Routes/GenericRouter.js";
import GenericService from "./src/Services/GenericService.js";
const app = express();
app.use(express.json());

// router
router(app, express);


const genericRoutes = [
	{ method: 'GET', path: '/', handler: 'getAll', middlewares: [] },
	{ method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
	{ method: 'POST', path: '/', handler: 'create', middlewares: [] },
	{ method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
	{ method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
	{ method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
];  
  const genericRecipeRouter = new GenericRouter(new GenericController(new GenericService(db.Recipe, [db.Ingredient])));
  genericRoutes.forEach(route => {
	genericRecipeRouter.addRoute(route, route.middlewares);
  });
  app.use(
	"/api" + "/recipes",
	genericRecipeRouter.getRouter()
  ); 


  const genericIngredientRouter = new GenericRouter(new GenericController(new GenericService(db.Ingredient)));
  genericRoutes.forEach(route => {
	genericIngredientRouter.addRoute(route, route.middlewares);
  });
  app.use(
	"/api" + "/ingredients",
	genericIngredientRouter.getRouter()
  ); 

  const genericStepRouter = new GenericRouter(new GenericController(new GenericService(db.Step)));
  genericRoutes.forEach(route => {
	genericStepRouter.addRoute(route, route.middlewares);
  });
  app.use(
	"/api" + "/steps",
	genericStepRouter.getRouter()
  ); 


  const genericRecipeIngredientRouter = new GenericRouter(new GenericController(new GenericService(db.RecipeIngredient)));
  genericRoutes.forEach(route => {
	genericRecipeIngredientRouter.addRoute(route, route.middlewares);
  });
  app.use(
	"/api" + "/recipeingredients",
	genericRecipeIngredientRouter.getRouter()
  ); 

// Sequelize
try {
  sequelize.authenticate().then(console.log('Connected to postgres'));
} catch (e) {
  console.error(`Error connecting to postgres: ${e}`);
}

export default app;

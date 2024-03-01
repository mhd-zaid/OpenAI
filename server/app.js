import express from 'express';
import sequelize from './src/config/sequelize.js';
import router from './src/config/router.js';
import db from './src/models/index.js';
import GenericController from './src/Controllers/GenericController.js';
import GenericRouter from './src/Routes/GenericRouter.js';
import GenericService from './src/Services/GenericService.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(cors());

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
const genericRecipeRouter = new GenericRouter(
  new GenericController(new GenericService(db.Recipe, [{
      modelName : db.Quantity,
      modelToInclude : {
        modelName: db.Ingredient
      }
  }])),
);
genericRoutes.forEach(route => {
  genericRecipeRouter.addRoute(route, route.middlewares);
});
app.use('/api' + '/recipes', genericRecipeRouter.getRouter());

const genericIngredientRouter = new GenericRouter(
  new GenericController(new GenericService(db.Ingredient)),
);
genericRoutes.forEach(route => {
  genericIngredientRouter.addRoute(route, route.middlewares);
});
app.use('/api' + '/ingredients', genericIngredientRouter.getRouter());

const genericUserRouter = new GenericRouter(
  new GenericController(new GenericService(db.User)),
);
genericRoutes.forEach(route => {
  genericUserRouter.addRoute(route, route.middlewares);
});
app.use('/api' + '/users', genericUserRouter.getRouter());

// Sequelize
try {
  sequelize.authenticate().then(console.log('Connected to postgres'));
} catch (e) {
  console.error(`Error connecting to postgres: ${e}`);
}

export default app;

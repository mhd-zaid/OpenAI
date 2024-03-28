
import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../Services/genericService.js";
import db from "../../src/models/index.js";
import favoriteController from '../controllers/favorite.js';
import verifyUser from '../middlewares/verifyUser.js';
const genericRoutes = [
    { method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
    { method: 'POST', path: '/', handler: 'create', middlewares: [verifyUser] },
    { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
    { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
    { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
  ];


  const genericFavoriteRouter = new GenericRouter(
  new GenericController(new GenericService(db.Favorite)),
);
genericRoutes.forEach(route => {
  genericFavoriteRouter.addRoute(route, route.middlewares);
});

export default (router) => {
  router.use('/', genericFavoriteRouter.getRouter());
  router.get('/user/:id', favoriteController.getAllByUser);
  return router;
};

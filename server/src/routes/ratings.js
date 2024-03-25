
import GenericRouter from "./genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../Services/genericService.js";
import db from "../models/index.js";

const genericRoutes = [
    { method: 'GET', path: '/', handler: 'getAll', middlewares: [] },
    { method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
    { method: 'POST', path: '/', handler: 'create', middlewares: [] },
    { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
    { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
    { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
  ];

  const genericRatingRouter = new GenericRouter(
  new GenericController(new GenericService(db.Rating)),
);
genericRoutes.forEach(route => {
  genericRatingRouter.addRoute(route, route.middlewares);
});

export default (router) => {
  router.use('/', genericRatingRouter.getRouter());
  return router;
};

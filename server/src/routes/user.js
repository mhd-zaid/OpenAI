import userController from "../controllers/user.js";
import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";
import verifyUser from "../middlewares/verifyUser.js";

export default function (router) {
  const genericRoutes = [
    // { method: 'GET', path: '/', handler: 'getAll', middlewares: [] },
    { method: 'POST', path: '/', handler: 'create', middlewares: [verifyUser] },
    // { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
    // { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
    // { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
  ];


  const genericUserRouter = new GenericRouter(
    new GenericController(new GenericService(db.User)),
  );
  genericRoutes.forEach(route => {
    genericUserRouter.addRoute(route, route.middlewares);
  });

  router.use('/', genericUserRouter.getRouter());
  router.get('/profile', verifyUser ,userController.getProfile);
  router.get('/comments', verifyUser ,userController.getComments);
  router.get('/favorites', verifyUser ,userController.getFavorites);
  router.get('/preferences', verifyUser ,userController.getPreferences);

  return router;
}

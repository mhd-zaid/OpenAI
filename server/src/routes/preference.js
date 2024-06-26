
import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";
import preferenceController from '../controllers/preference.js';
import verifyUser from "../middlewares/verifyUser.js";

const genericRoutes = [
  // { method: 'GET', path: '/:id', handler: 'getById', middlewares: [verifyUser] },
  { method: 'POST', path: '/', handler: 'create', middlewares: [verifyUser] },
  { method: 'PUT', path: '/:id', handler: 'update', middlewares: [verifyUser] },
  // { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [verifyUser] },
  { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [verifyUser] },
];

const genericPreferenceRouter = new GenericRouter(
  new GenericController(new GenericService(db.Preferences)),
);
genericRoutes.forEach(route => {
  genericPreferenceRouter.addRoute(route, route.middlewares);
});

export default router => {
  router.use('/', genericPreferenceRouter.getRouter());
  router.get('/user/:id', preferenceController.getAllByUser);
  // router.post('/bulk', verifyUser, preferenceController.bulkPreferences);
  return router;
};


import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";
import preferenceController from '../controllers/preference.js';
const genericRoutes = [
  { method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
  { method: 'POST', path: '/', handler: 'create', middlewares: [] },
  { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
  { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
  { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
];

const genericPreferenceRouter = new GenericRouter(
  new GenericController(new GenericService(db.Preference)),
);
genericRoutes.forEach(route => {
  genericPreferenceRouter.addRoute(route, route.middlewares);
});

export default router => {
  router.use('/', genericPreferenceRouter.getRouter());
  router.get('/user/:id', preferenceController.getAllByUser);
  router.post('/bulk', preferenceController.bulkPreferences);
  return router;
};


import GenericRouter from "../routes/genericRouter.js";
import GenericController from "../controllers/genericController.js";
import GenericService from "../services/genericService.js";
import db from "../../src/models/index.js";
import ApiResponse from '../utils/apiResponse.js';
import verifyUser from '../middlewares/verifyUser.js';

const isExistComment = async (req, res, next) => {
  const { UserId, RecipeId } = req.body;
  console.log("comment", { UserId, RecipeId })
  const comment = await db.Comment.findAll({ where: { UserId, RecipeId } });
  if (comment.length === 0 || !comment) {
    next();
  } else {
    res.status(200).send(new ApiResponse(false, null, null,"Nous avons déjà pris en compte votre commentaire. Vous pouvez retrouver votre avis dans la section 'Mes avis' de votre profil."));
  }
}

const genericRoutes = [
    { method: 'GET', path: '/', handler: 'getAll', middlewares: [] },
    { method: 'GET', path: '/:id', handler: 'getById', middlewares: [] },
    { method: 'POST', path: '/', handler: 'create', middlewares: [verifyUser, isExistComment] },
    { method: 'PUT', path: '/:id', handler: 'update', middlewares: [] },
    { method: 'PATCH', path: '/:id', handler: 'patch', middlewares: [] },
    { method: 'DELETE', path: '/:id', handler: 'delete', middlewares: [] },
  ];


const genericCommentRouter = new GenericRouter(
  new GenericController(new GenericService(db.Comment)),
);
genericRoutes.forEach(route => {
  genericCommentRouter.addRoute(route, route.middlewares);
});

export default router => {
  router.use('/', genericCommentRouter.getRouter());
  return router;
};

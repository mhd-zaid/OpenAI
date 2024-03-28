import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';

const getProfile = async (req, res) => {
  const id = req.params.id;
  const model = await db.User.findOne({
    attributes: ['id', 'userName', 'email'],
    where: {
      id
    },
    include: [
      {
        model: db.Comment,
        as: 'Comments',
        attributes: ['id', 'comment', 'rating', 'RecipeId', 'createdAt'],
      },
      {
        model: db.Favorite,
        as: 'Favorites',
        attributes: ['id', 'RecipeId'],
        include: [
          {
            model: db.Recipe,
            as: 'Recipe',
            attributes: ['id', 'title', 'url', 'nb_rating', 'average_rating'],
          }
        ]
      },
      {
        model: db.Preferences,
        as: 'Preferences'
      }
    ]
  });
  if(model) return res.status(200).json(new ApiResponse(true, model));
  return res.status(404).json(new ApiResponse(false, null, null, "Utilisateur introuvable"));
}

export default { getProfile }
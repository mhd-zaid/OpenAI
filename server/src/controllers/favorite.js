import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';

const getAllByUser = async(req, res) => {
    const { page: reqPage, limit: reqLimit,id: id, ...filters } = req.query;
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 10;
    const offset = (page - 1) * limit;

    try {
      const favorites = await db.Preferences.findAll({
        where: {UserId: id,...filters},
        limit,
        offset,
        include: [
          {
            model: db.Recipe,
            as: 'Recipe' 
          },
          {
            model: db.User,
            as: 'User' 
          }
        ],
      });

      return res.status(200).json(new ApiResponse(true, favorites));
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      return res
        .status(500)
        .json(
          new ApiResponse(
            false,
            null,
            "Une erreur s'est produite lors de la récupération des données.",
          ),
        );
    }
}

export default {getAllByUser}
import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';

const getAll = async(req, res) => {
    const { page: reqPage, limit: reqLimit, ...filters } = req.query;
    let limit, offset;
    if(reqPage && reqLimit) {
        const page = parseInt(reqPage) || 1;
        limit = parseInt(reqLimit) || 10;
        offset = (page - 1) * limit;
    }

    try {
      const ingredients = await db.Ingredient.findAll({
        attributes: ['id', 'name'],
        where: {...filters},
        limit,
        offset
      });

      return res.status(200).json(new ApiResponse(true, ingredients));
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

export default {getAll}
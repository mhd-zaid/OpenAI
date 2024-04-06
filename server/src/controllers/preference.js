import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';
import { uuidv7 } from 'uuidv7';

const getAllByUser = async(req, res) => {
    const { page: reqPage, limit: reqLimit, ...filters } = req.query;
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 10;
    const offset = (page - 1) * limit;
    const id = req.params.id;

    try {
      const preferences = await db.Preferences.findAll({
        where: {UserId: id,...filters},
        limit,
        offset,
        include: [
          {
            model: db.Ingredient,
            as: 'Ingredient' 
          },
          {
            model: db.User,
            as: 'User' 
          }
        ],
      });

      return res.status(200).json(new ApiResponse(true, preferences));
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

const bulkPreferences = async (req, res) => {
  try {
    const preferencesData = req.body.Preferences;
    console.log(req.body)

    console.log("TABLEAU DE PREFERENCE : ", preferencesData)
    preferencesData.forEach((preference) => {
      preference.id = uuidv7(); 
    });
    await db.Preferences.bulkCreate(preferencesData);

    return res.status(201).json(new ApiResponse(true, preferencesData));
  } catch (error) {
      console.error("Erreur lors de la création des preferences :", error);
      throw error;
  }
}

export default {getAllByUser, bulkPreferences}

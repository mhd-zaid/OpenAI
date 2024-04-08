import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';
import { uuidv7 } from 'uuidv7';

import { nanoid } from 'nanoid';

const create = async (req, res) => {
    try {
        const id = uuidv7();
        const recipeData = req.body
        const newRecipe = await db.Recipe.create({
            id: id,
            title: recipeData.title,
            description: recipeData.description,
            tips: recipeData.tips,
            time: recipeData.time,
            level: recipeData.level,
            tags: recipeData.tags,
            instructions: recipeData.instructions,
            image: recipeData.image,
            url: createRecipeUrl(recipeData.title),
        });

        const quantities = recipeData.Quantities.map(quantity => ({
            unit: quantity.unit,
            amount: quantity.quantity,
            IngredientId: quantity.IngredientId,
            RecipeId: id,
        }));

        await db.Quantity.bulkCreate(quantities);

        return res.status(201).json(new ApiResponse(true, newRecipe));
    } catch (error) {
        console.error("Erreur lors de la création de la recette :", error);
        throw error;
    }
}

const getAll = async(req, res) => {
    const { page: reqPage, limit: reqLimit, ...filters } = req.query;
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 10;
    const offset = (page - 1) * limit;

    try {
        const quantities = await db.Recipe.findAll({
            where: filters,
            limit,
            offset,
            include: [
                {
                    model: db.Quantity,
                    as: 'Quantities',
                    include: [db.Ingredient]
                },
                {
                    model: db.Comment,
                    as: 'Comments'
                },
            ],
        });

        const countTotal = await db.Recipe.count({ where: filters });
        res.set('X-Total-Count', countTotal);
        return res.status(200).json(new ApiResponse(true, quantities));
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

const getByUrl = async (req, res) => {
    const url = req.params.url;
    const model = await db.Recipe.findOne({
        where: {
            url,
        },
        include: [
            {
                model: db.Quantity,
                as: 'Quantities',
                attributes: ['unit', 'quantity'],
                include: [
                    {
                        model: db.Ingredient,
                        attributes: ['name']
                    }
                ]
            },
            {
                model: db.Comment,
                as: 'Comments',
                attributes: ['comment', 'rating', 'createdAt'],
                include: [
                    {
                        model: db.User,
                        as: 'User',
                        attributes: ['userName']
                    }
                ]
            }
        ],
    });
    if (model) return res.status(200).json(new ApiResponse(true, model));
    return res.status(404).json(new ApiResponse(false, null, "Recette non trouvée"));
}

const createRecipeUrl = (title) => {
    const cleanedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const baseUrl = "/recettes/";
    return baseUrl + cleanedTitle + "-" + nanoid(6);
}


export default {create, getAll, getByUrl}

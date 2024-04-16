import ApiResponse from '../utils/apiResponse.js';
import db from '../models/index.js';

const getProfile = async (req, res) => {
    const id = req.body.UserId;

    const model = await db.User.findOne({
        attributes: ['id', 'userName', 'email'],
        where: {
            id
        },
        include: [
            {
                model: db.Comment,
                as: 'Comments',
                attributes: ['id', 'comment', 'rating', 'createdAt'],
                include: [
                    {
                        model: db.Recipe,
                        as: 'Recipe',
                        attributes: ['id', 'title', 'url', 'nb_rating', 'average_rating'],
                    }
                ]
            },
            {
                model: db.Favorite,
                as: 'Favorites',
                attributes: ['id'],
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

const getComments = async (req, res) => {
    const id = req.body.UserId;

    const comments = await db.Comment.findAll({
        where: {
            UserId: id
        },
        attributes: ['comment', 'rating', 'createdAt'],
        include: [
            {
                model: db.Recipe,
                as: 'Recipe',
                attributes: ['id', 'title', 'url', 'nb_rating', 'average_rating', 'image'],
            },
            {
                model: db.User,
                as: 'User',
                attributes: ['userName']
            }
        ]
    });
    return res.status(200).json(new ApiResponse(true, comments));
}

const getFavorites = async (req, res) => {
    const id = req.body.UserId;
    const favorites = await db.Favorite.findAll({
        where: {
            UserId: id
        },
        include: [
            {
                model: db.Recipe,
                as: 'Recipe',
                attributes: ['id', 'title', 'url', 'nb_rating', 'average_rating', 'image', 'duration'],
            }
        ]
    });
    return res.status(200).json(new ApiResponse(true, favorites));
}

const getPreferences = async (req, res) => {
    const id = req.body.UserId;
    const preferences = await db.Preferences.findAll({
        where: {
            UserId: id
        },
        attributes: ['id', 'isLiked', 'isAllergic'],
        include: [
            {
                model: db.Ingredient,
                as: 'Ingredient',
                attributes: ['id', 'name'],
            }
        ]
    });
    return res.status(200).json(new ApiResponse(true, preferences));
}

export default { getProfile, getComments, getFavorites, getPreferences }
import {uuidv7} from "uuidv7";
import ApiResponse from "../utils/apiResponse.js";
// const ValidationError = require("../errors/ValidationError");

class GenericService {
  constructor(model, include) {
    this.Model = model;
    this.include = include;
  }

  async getAll(req, res) {
    const { page: reqPage, limit: reqLimit, ...filters } = req.query;
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 10;
    const offset = (page - 1) * limit;

    try {
      // Configuration de l'option d'inclusion
      const includeOptions = this.includeModels();

      // Récupérer les modèles avec la pagination et les inclusions
      const models = await this.Model.findAll({
        where: filters,
        limit,
        offset,
        include: includeOptions,
      });

      const countTotal = await this.Model.count({ where: filters });
      res.set('X-Total-Count', countTotal);
      return res.status(200).json(new ApiResponse(true, models));
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      return res.status(500).json(new ApiResponse(false, null, "Une erreur s'est produite lors de la récupération des données."));
    }
  }

    // Méthode pour gérer les inclusions
    includeModels() {
      if (!this.include) {
        return [];
      }
  
      const includeOptions = [];
  
      // Gérez chaque modèle inclus
      this.include.forEach((includeModel) => {
        const modelInclude = { model: includeModel };
  
        // Vérifiez s'il y a un sous-modèle à inclure
        if (includeModel.include) {
          const subIncludeOptions = this.includeModels(includeModel.include);
          modelInclude.include = subIncludeOptions;
        }
  
        includeOptions.push(modelInclude);
      });
  
      return includeOptions;
    }

  async getById(req, res) {
    const id = req.params.id;
    const model = await this.Model.findOne({
      where: {
        id,
      },
    });
    if (model) return res.status(200).json(new ApiResponse(true, model));
    return res.sendStatus(404);
  }

  async create(req, res, next) {
    try {
      const id = uuidv7();
      const model = await this.Model.create({ id, ...req.body });
      return res.status(201).json(new ApiResponse(true, model));
    } catch (error) {
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError"
      // ) {
      //   error = ValidationError.fromSequelize(error);
      // }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const nbDeleted = await this.Model.destroy({ where: { id } });
      const updatedItem = await this.Model.create({ id, ...req.body });

      if (nbDeleted > 0) {
        return res.status(200).json(new ApiResponse(true, updatedItem));
      } else {
        return res.status(201).json(new ApiResponse(true, updatedItem));
      }
    } catch (error) {
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError"
      // ) {
      //   error = ValidationError.fromSequelize(error);
      // }
      next(error);
    }
  }

  async patch(req, res, next) {
    try {
      const id = req.params.id;
      const [_, items] = await this.Model.update(req.body, {
        where: { id },
        individualHooks: true,
      });
      if (!items.length) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(new ApiResponse(true, items[0]));
      }
    } catch (error) {
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError"
      // ) {
      //   error = ValidationError.fromSequelize(error);
      // }
      next(error);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    const nbDeleted = await this.Model.destroy({
      where: {
        id,
      },
      individualHooks: true,
    });
    if (nbDeleted) return res.sendStatus(204);
    return res.sendStatus(404);
  }
}

export default GenericService;

import { uuidv7 } from 'uuidv7';

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

      const includeOptions = this.includeModels();

      const models = await this.Model.findAll({
        where: filters,
        limit,
        offset,
        include: includeOptions,
      });

      const countTotal = await this.Model.count({ where: filters });
      res.set('X-Total-Count', countTotal);
      return res.status(200).json(models);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }

  includeModels(config = this.include) {
    if (!config) {
      return [];
    }
  
    const includeOptions = [];
  
    config.forEach(includeModel => {
  
      const modelInclude = { model: includeModel.modelName };
  
      if (includeModel.modelToInclude) {
        const subIncludeOptions = Array.isArray(includeModel.modelToInclude)
          ? this.includeModels(includeModel.modelToInclude)
          : this.includeModels([includeModel.modelToInclude]);
  
        modelInclude.include = subIncludeOptions;
      }
  
      includeOptions.push(modelInclude);
    });
  
    return includeOptions;
  }

  async getById(req, res) {
    const id = req.params.id;
    const includeOptions = this.includeModels();
    const model = await this.Model.findOne({
      where: {
        id,
      },
      include: includeOptions,
    });
    if (model) return res.status(200).json(model);
    return res.sendStatus(404);
  }

  async create(req, res, next) {
    try {
      const id = uuidv7();
      const include = this.includeModels();
      const model = await this.Model.create({
        id,
        ...req.body
      }, {
        include: include
      })
      return res.status(201).json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const include = this.includeModels();
      const nbDeleted = await this.Model.destroy({ where: { id } });
      const updatedItem = await this.Model.create({
        id,
        ...req.body
      }, {
        include: include
      })

      if (nbDeleted > 0) {
        return res.status(200).json(updatedItem);
      } else {
        return res.status(201).json(updatedItem);
      }
    } catch (error) {
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
        return res.status(200).json(items[0]);
      }
    } catch (error) {
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

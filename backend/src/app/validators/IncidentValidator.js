import { celebrate, Segments, Joi } from 'celebrate';

class IncidentValidator {
  static index() {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      })
    });
  }

  static store() {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
      
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(20).max(1500),
        value: Joi.number().required()
      })
    });
  }

  static destroy() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),

      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown()
    });
  }
}

export default IncidentValidator;

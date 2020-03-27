import { celebrate, Segments, Joi } from 'celebrate';

class OngValidator {
  static store() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(2).max(255),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
      })
    });
  }
}

export default OngValidator;

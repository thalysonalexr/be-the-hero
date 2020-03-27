import { celebrate, Segments, Joi } from 'celebrate';

class SessionValidator {
  static store() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
      })
    });
  }
}

export default SessionValidator;

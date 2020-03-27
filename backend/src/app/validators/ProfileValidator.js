import { celebrate, Segments, Joi } from 'celebrate';

class ProfileValidator {
  static index() {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    });
  }
}

export default ProfileValidator;

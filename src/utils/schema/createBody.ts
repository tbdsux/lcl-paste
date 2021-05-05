import { ApiCreatePasteBody } from '@utils/interfaces/paste';
import Joi from 'joi';

const ApiCreateBodySchema = Joi.object<ApiCreatePasteBody>({
  filename: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  description: Joi.string().allow('').default(false),
  isPrivate: Joi.boolean().default(false)
  // description: Joi.string().min(1).optional().default(''), NOTE: joi is showing required error in here
  // isPrivate: Joi.boolean().default(false)
}).with('filename', 'content');

export { ApiCreateBodySchema };

import { ApiUpdatePasteBody } from '@utils/interfaces/paste';
import Joi from 'joi';

const ApiUpdateBodySchema = Joi.object<ApiUpdatePasteBody>({
  filename: Joi.string().min(1),
  content: Joi.string().min(1),
  description: Joi.string().min(1),
  isPrivate: Joi.bool()
});

export { ApiUpdateBodySchema };

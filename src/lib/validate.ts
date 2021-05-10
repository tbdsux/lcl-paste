import { ObjectSchema } from 'joi';

// helper for validating joi schemas
const schemaValidate = async <T>(d: ObjectSchema<T>, val) => {
  return await d
    .validateAsync(val)
    .then((r) => [true, r])
    .catch((e) => {
      console.error(e);
      return [false, e.details[0].message];
    });
};

export { schemaValidate };

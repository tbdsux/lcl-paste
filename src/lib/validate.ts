import { ObjectSchema } from 'joi';

const isDataBlank = <T>(data: T) => {
  // special case for booleans
  if (typeof data === 'boolean') return false;

  if (data) {
    return false;
  }

  return true;
};

const isStringNull = (d: string | null): boolean => d === null || d === '';
const isUndefined = <T>(d: T) => d === undefined;
const isObject = <T>(d: T): boolean => typeof d === 'object';

const isRequestValid = (json: object, fields: string[]): boolean => {
  var v = false;
  for (let index = 0; index < fields.length; index++) {
    const e = json[fields[index]];

    if (!isUndefined(e)) {
      v = true;
    }
  }

  return v;
};

const checkRequiredField = (d: object, requiredFields: string[]) => {
  for (let index = 0; index < requiredFields.length; index++) {
    const r = requiredFields[index];

    if (isDataBlank(d[r])) {
      return {
        error: true,
        data: {
          rdata: null,
          ok: false,
          err: {
            error: true,
            code: 400,
            description: `'${r}' should not be blank.`
          }
        }
      };
    }
  }

  return {
    error: false,
    data: null
  };
};

const checkNotNull = (d: object, fields: string[]) => {
  for (let index = 0; index < fields.length; index++) {
    const e = fields[index];

    if (isStringNull(d[e])) {
      return {
        error: true,
        data: {
          rdata: null,
          ok: false,
          err: {
            error: true,
            code: 400,
            description: `'${e}' should not be blank.`
          }
        }
      };
    }
  }
  return {
    error: false,
    data: null
  };
};

// helper for validating joi schemas
const schemaValidate = async <T>(d: ObjectSchema<T>, val) => {
  return await d
    .validateAsync(val)
    .then((r) => [true, r])
    .catch((e) => [false, e.details[0].message]);
};

export { isDataBlank, isUndefined, checkRequiredField, isStringNull, isObject, checkNotNull, schemaValidate };

const isDataBlank = <T>(data: T) => {
  // special case for booleans
  if (typeof data === 'boolean') {
    if (data === false || data === true) {
      return false;
    }
  }

  if (data) {
    return false;
  }

  return true;
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

export { isDataBlank, checkRequiredField };

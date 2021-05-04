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

export { isDataBlank };

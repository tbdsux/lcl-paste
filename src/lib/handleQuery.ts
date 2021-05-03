import { ApiBaseQueryResponse, QueryErrorResponse } from '@utils/interfaces/query';
import { errors } from 'faunadb';

const getQueryError = (e: errors.FaunaHTTPError): QueryErrorResponse => {
  return {
    error: true,
    description: e.description,
    code: e.requestResult.statusCode
  };
};

// unsure about this
const getQuery = <T>(data: T): ApiBaseQueryResponse<T> => {
  return {
    error: false,
    code: 200,
    data: data
  };
};

export { getQuery, getQueryError };

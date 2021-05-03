import { Paste } from './paste';
import { UserDataProps } from './user';

interface QueryResponse {
  ref: Object;
  ts: number;
}

interface PasteQueryResponse extends QueryResponse {
  data: Paste;
}

type MultiplePastesQuery = {
  data: PasteQueryResponse[];
};

type RawPasteResp = { content: string; filename: string };

// query responses
interface GetPasteResponse {
  id?: number;
  paste: Paste;
  user: UserDataProps;
}

interface BaseQuery {
  error: boolean;
  code: number;
  description?: string;
  data?: any;
}

interface QueryErrorResponse extends BaseQuery {}

// api/pastes/get/[pasteid]
interface GetPasteByIdQuery extends BaseQuery {
  data: GetPasteResponse;
}

// api/pastes/get/ref/[refid]
interface GetPasteByRefQuery extends BaseQuery {
  data: Paste;
}

interface GetLatestPastesQuery extends BaseQuery {
  data: PasteQueryResponse[];
}

// EXPORT
export type {
  GetPasteResponse,
  PasteQueryResponse,
  RawPasteResp,
  GetLatestPastesQuery,
  QueryErrorResponse,
  BaseQuery as ApiBaseQueryResponse,
  GetPasteByIdQuery,
  GetPasteByRefQuery,
  MultiplePastesQuery
};

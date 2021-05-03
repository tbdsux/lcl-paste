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

interface RawPaste {
  content: string;
  filename: string;
}

// query responses
interface GetPasteResponse {
  id?: number;
  paste: Paste;
  user: UserDataProps;
}

interface BaseQuery<T> {
  error: boolean;
  code: number;
  description?: string;
  data?: T;
}

interface QueryErrorResponse extends BaseQuery<null> {}

// api/pastes/get/[pasteid]
interface GetPasteByIdQuery extends BaseQuery<GetPasteResponse> {}

// api/pastes/get/ref/[refid]
interface GetPasteByRefQuery extends BaseQuery<Paste> {}

// api/pastest/latest
interface GetLatestPastesQuery extends BaseQuery<PasteQueryResponse[]> {}

// api/pastes/user
interface GetUserPastesQuery extends GetLatestPastesQuery {}

// api/raw/[pasteid]/[filename]
interface GetRawPasteQuery extends BaseQuery<RawPaste> {}

// /api/pastes/update/[refid]/[pasteid]
interface UpdatePasteQuery extends BaseQuery<Paste> {}

// api/pastes/delete/[refid]
interface DeletePasteQuery extends BaseQuery<null> {}

// api/pastes/create
interface CreatePasteQuery extends BaseQuery<PasteQueryResponse> {}

// EXPORT
export type {
  GetPasteResponse,
  PasteQueryResponse,
  GetRawPasteQuery,
  RawPaste,
  GetLatestPastesQuery,
  QueryErrorResponse,
  BaseQuery as ApiBaseQueryResponse,
  GetPasteByIdQuery,
  GetPasteByRefQuery,
  MultiplePastesQuery,
  GetUserPastesQuery,
  UpdatePasteQuery,
  DeletePasteQuery,
  CreatePasteQuery
};

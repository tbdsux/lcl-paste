import { Paste } from './paste';
import { UserDataProps } from './user';

interface QueryResponse {
  ref: Object;
  ts: number;
}

export interface PasteQueryResponse extends QueryResponse {
  data: Paste;
}

export type RawPasteResp = { content: string; filename: string };

export type MultipleRespPastes = { data: PasteQueryResponse[] };

// query responses
interface GetPasteReponse {
  pasteRefId?: number;
  paste: Paste;
  user: UserDataProps;
}

export type { GetPasteReponse };

import { Paste } from './paste';

interface QueryResponse {
  ref: Object;
  ts: number;
}

export interface PasteQueryResponse extends QueryResponse {
  data: Paste;
}

export type RawPasteResp = { content: string; filename: string };

export type MultipleRespPastes = { data: PasteQueryResponse[] };

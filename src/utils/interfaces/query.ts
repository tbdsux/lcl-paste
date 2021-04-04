import { Paste } from './paste';
import { Api } from './api';

interface QueryResponse {
  ref: Object;
  ts: number;
}

export interface PasteQueryResponse extends QueryResponse {
  data: Paste;
}

export interface ApiQueryResponse extends QueryResponse {
  data: Api;
}

export type RawPasteResp = { content: string; filename: string };

export type MultipleRespPastes = { data: PasteQueryResponse[] };

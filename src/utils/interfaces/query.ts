import { Paste } from './paste';

export interface PasteQueryResponse {
  ref: Object;
  ts: number;
  data: Paste;
}

export type RawPasteResp = { content: string; filename: string };

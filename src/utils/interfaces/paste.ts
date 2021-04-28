import { Expr } from 'faunadb';
import { PasteQueryResponse } from './query';

// paste info data
export interface Paste {
  content: string;
  filename: string;
  description: string;
  isPrivate: boolean;
  isCode: boolean;
  codeLanguage: null | string;
  pasteId: string;
  isOwnedByUser: boolean;
  ownedByUsername: string;
  user?: Expr | Object;
  willExpire: boolean;
  expiryDate: null | string;
  createdDate: string;
  updated?: boolean;
  updatedDate?: string;
}

export interface UpdatePaste {
  content?: string;
  filename?: string;
  description?: string;
  isPrivate?: boolean;
  isCode?: boolean;
  codeLanguage?: null | string;
  willExpire?: boolean;
  expiryDate?: boolean;
  updated?: boolean;
  updatedDate?: string;
}

export type PastesSwrResponse = {
  data?: PasteQueryResponse[];
  error?: any;
};

export type SinglePasteSwrResponse = {
  data?: PasteQueryResponse;
  error?: any;
};

// user paste basic data
export interface PasteUserData {
  sub: string;
  subId: string;
  name: string;
  photo: string;
}

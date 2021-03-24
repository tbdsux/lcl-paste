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
  user: null | string;
  willExpire: boolean;
  expiryDate: null | string;
  createdDate: string;
}

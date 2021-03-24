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
  user: null | PasteUserData;
  willExpire: boolean;
  expiryDate: null | string;
  createdDate: string;
}

// user paste basic data
export interface PasteUserData {
  email: string;
  name: string;
  photo: string;
}

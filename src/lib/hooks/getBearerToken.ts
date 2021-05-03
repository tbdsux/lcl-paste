import { unsealAPI } from '@lib/api-seal';
import { NextApiRequest } from 'next';

export const getBearerToken = (req: NextApiRequest) => {
  const token = req.headers.authorization;

  if (!token) return null;

  return unsealAPI(token.substr(7));
};

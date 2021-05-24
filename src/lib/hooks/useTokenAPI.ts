import { getSession } from '@auth0/nextjs-auth0';
import { SessionProps } from '@utils/interfaces/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { getBearerToken } from './getBearerToken';

// return the user token
export const useTokenAPI = (req: IncomingMessage | NextApiRequest, res: ServerResponse | NextApiResponse) => {
  // prioritize authorization token
  if (req.headers.authorization) {
    const token = getBearerToken(req);
    return token;
  }

  const session: SessionProps = getSession(req, res);
  if (session) return session.user && session.user.token;

  return process.env.FAUNADB_LCLPASTE_PUBLIC_KEY;
};

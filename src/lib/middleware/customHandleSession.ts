// rebased from:: https://github.com/auth0/nextjs-auth0/blob/main/src/helpers/with-api-auth-required.ts

import { getSession } from '@auth0/nextjs-auth0';
import { getBearerToken } from '@lib/hooks/getBearerToken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const withCustomSessionHandler = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  const bearerToken = getBearerToken(req);

  if (!bearerToken) {
    const session = getSession(req, res);

    if (!session || !session.user) {
      res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated'
      });
      return;
    }
  }

  return handler(req, res);
};

/*
  NOTE: /api/auth/[...auth] -> nextjs-auth0 api router handler
*/

import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { obtainFaunaDBToken } from '@lib/models/userAuth';
import { CreateUserIfNotExists } from '@lib/userExists';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session, state) => {
  return await CreateUserIfNotExists(session.user).then(async () => {
    const token = await obtainFaunaDBToken(session.user.sub);
    session.user.token = token;
    return session;
  });
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});

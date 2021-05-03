/*
  NOTE: /api/auth/[...auth] -> nextjs-auth0 api router handler
*/

import { getSession, handleAuth, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { invalidateFaunaDBToken, obtainFaunaDBToken } from '@lib/models/userAuth';
import { CreateApiKeyIfNotExists, CreateUserIfNotExists } from '@lib/userExists';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session, state) => {
  return await CreateUserIfNotExists(session.user).then(async () => {
    const token = await obtainFaunaDBToken(session.user.sub);
    const api_key = await CreateApiKeyIfNotExists(token, session.user.sub);

    session.user.token = token;
    session.user.api_key = api_key;

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
  },
  async logout(req, res) {
    try {
      const session = getSession(req, res);
      if (session) {
        let logout = await invalidateFaunaDBToken(session.user.token);
        if (logout) {
          logout = null;
        }
      }
      await handleLogout(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});

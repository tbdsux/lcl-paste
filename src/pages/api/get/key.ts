/*
  NOTE: /api/get/key -> api endpoint for generating a user token api
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import methodHandler from '@lib/middleware/methods';
import { ApiModel } from '@lib/models/api';

type SessionProps = { user: UserProfile };

const getUserApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user }: SessionProps = getSession(req, res);

  const p = new ApiModel();

  // try to get existing api
  const a = await p.getApi(user.sub);

  if (a) {
    if (!validateKey(user.sub, a)) {
      return res.status(403).json({ error: 'unauthorized' });
    }

    return res.status(200).json({ api: a });
  }

  // otherwise, create a new one
  const q = await p.createApiKey(user);
  if (!validateKey(user.sub, q)) {
    return res.status(403).json({ error: 'unauthorized' });
  }

  return res.status(200).json(q ? { api: q } : { error: 'internal error' });
};

// check if api structure is valid
function validateKey(sub: string, key: string): boolean {
  const s: string = key.split('-')[0];

  if (Buffer.from(s.slice(1, s.length), 'base64').toString('ascii') !== sub) {
    console.log(Buffer.from(s.slice(1, sub.length), 'base64').toString('ascii'));
    return false;
  }

  return true;
}

export default methodHandler(withApiAuthRequired(getUserApi), ['GET']);

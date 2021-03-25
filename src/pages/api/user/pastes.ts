import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { getSubId } from '@utils/funcs';

type SessionProps = { user: UserProfile };

const getUserPastes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user }: SessionProps = getSession(req, res);

  const p = new PasteModel();
  const q = await p.getUserPastes(getSubId(user.sub));

  return res.status(200).json(q ? q.data : { error: 'internal error' });
};

export default methodHandler(withApiAuthRequired(getUserPastes), ['GET']);

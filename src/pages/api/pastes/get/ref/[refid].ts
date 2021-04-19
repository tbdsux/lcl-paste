/*
  Note: this api is meant to be acessed only by a logged in user.
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';

import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const getPasteRef = async (req: NextApiRequest, res: NextApiResponse) => {
  const { refid } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.getPasteByRef(autoString(refid));

  if (q) {
    const isOwnedByCurrentUser = await p.verifyPasteByUserRef(q.user);

    return res.status(200).json({ isOwnedByCurrentUser, data: q });
  }

  return res.status(404).json({ error: 'Not Found' });
};

export default methodHandler(withApiAuthRequired(getPasteRef), ['GET']);

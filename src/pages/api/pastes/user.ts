/*
  NOTE: /api/user/pastes -> returns the current user's pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, UserProfile } from '@auth0/nextjs-auth0';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const getUserPastes = async (req: NextApiRequest, res: NextApiResponse) => {
  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.getUserPastes();

  return res.status(200).json(q ? q.data : []);
};

export default methodHandler(withApiAuthRequired(getUserPastes), ['GET']);

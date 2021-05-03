/*
  NOTE: /api/user/pastes -> returns the current user's pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, UserProfile } from '@auth0/nextjs-auth0';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetUserPastesQuery } from '@utils/interfaces/query';

export type ApiGetUserPastes = GetUserPastesQuery;

const getUserPastes = async (req: NextApiRequest, res: NextApiResponse<ApiGetUserPastes>) => {
  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.getUserPastes();

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(getUserPastes), ['GET']);

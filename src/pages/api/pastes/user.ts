/*
  NOTE: /api/user/pastes -> returns the current user's pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetUserPastesQuery } from '@utils/interfaces/query';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

export type ApiGetUserPastes = GetUserPastesQuery;

const getUserPastes = async (req: NextApiRequest, res: NextApiResponse<ApiGetUserPastes>) => {
  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.getUserPastes();

  res.status(q.code).json(q);
};

export default methodHandler(withCustomSessionHandler(getUserPastes), ['GET']);

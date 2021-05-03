/*
  NOTE: /api/pastes/latest -> returns all of the latest public pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetLatestPastesQuery, QueryErrorResponse } from '@utils/interfaces/query';

export type ApiGetLatestResponse = GetLatestPastesQuery | QueryErrorResponse;

const getLatest = async (req: NextApiRequest, res: NextApiResponse<ApiGetLatestResponse>) => {
  const token = useTokenAPI(req, res);

  const p = new PasteModel(token);
  const q = await p.getLatestPastes();

  res.status(q.code).json(q);
};

export default methodHandler(getLatest, ['GET']);

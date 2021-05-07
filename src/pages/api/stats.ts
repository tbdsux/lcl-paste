/*
  NOTE: /api/pastes/stats -> returns the app's data statistics
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { GetStatsQuery } from '@utils/interfaces/query';
import { Stats } from '@lib/models/stats';

export type ApiGetStats = GetStatsQuery;

const getStats = async (req: NextApiRequest, res: NextApiResponse<ApiGetStats>) => {
  const s = new Stats();
  const q = await s.getStats();

  res.status(q.code).json(q);
};

export default methodHandler(getStats, ['GET']);

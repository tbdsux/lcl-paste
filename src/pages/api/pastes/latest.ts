import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';

const getLatest = async (req: NextApiRequest, res: NextApiResponse) => {
  const p = new PasteModel();
  const q = await p.getLatestPastes();

  return res.status(200).json(q ? q.data : { error: 'internal error' });
};

export default methodHandler(getLatest, ['GET']);

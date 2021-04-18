import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const getLatest = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = useTokenAPI(req, res);

  const p = new PasteModel(token);
  const q = await p.getLatestPastes();

  return res.status(200).json(q ? q : { error: 'internal error' });
};

export default methodHandler(getLatest, ['GET']);

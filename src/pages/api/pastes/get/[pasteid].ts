import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';

// middleware
import methodHandler from '@lib/middleware/methods';

const getPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pasteid } = req.query;

  const p = new PasteModel();
  // automatically join all strings if array
  const q = await p.getPaste(Array.isArray(pasteid) ? pasteid.join() : pasteid);

  if (q) {
    return res.status(200).json(q);
  }

  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(getPaste, ['GET']);

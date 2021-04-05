import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
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

export default methodHandler(withApiAuthRequired(getPaste), ['GET']);

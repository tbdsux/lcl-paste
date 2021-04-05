import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { Paste } from '@utils/interfaces/paste';

const createPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: Paste = req.body;

  const p = new PasteModel();
  const q = await p.createPaste(data);

  if (q) {
    return res.status(200).json(q);
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(withApiAuthRequired(createPaste), ['PUT', 'POST']);

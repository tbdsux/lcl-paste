import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { UpdatePaste } from '@utils/interfaces/paste';
import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const createPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = useTokenAPI(req, res);

  const data: UpdatePaste = req.body;
  const { refid } = req.query;

  const p = new PasteModel(token);
  const q = await p.updatePaste(autoString(refid), data);

  if (q) {
    return res.status(200).json(q);
  }

  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(withApiAuthRequired(createPaste), ['PUT', 'POST']);

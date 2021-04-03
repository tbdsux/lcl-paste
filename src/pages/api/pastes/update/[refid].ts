import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';

// middleware
import methodHandler from '@lib/middleware/methods';

// interfaces
import { UpdatePaste } from '@utils/interfaces/paste';
import { autoString } from '@utils/funcs';

const createPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: UpdatePaste = req.body;
  const { refid } = req.query;

  const p = new PasteModel();
  const q = await p.updatePaste(autoString(refid), data);

  if (q) {
    return res.status(200).json(q);
  }

  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(createPaste, ['PUT', 'POST']);

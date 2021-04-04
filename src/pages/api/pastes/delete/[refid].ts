import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';

// middleware
import methodHandler from '@lib/middleware/methods';
import { autoString } from '@utils/funcs';

const getPasteRef = async (req: NextApiRequest, res: NextApiResponse) => {
  const { refid } = req.query;

  const p = new PasteModel();
  const q = await p.deletePasteByRef(autoString(refid));

  if (q) {
    // redirect back to user's paste if successfully deleted
    res.redirect('/user/pastes');
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
};

export default methodHandler(getPasteRef, ['DELETE']);

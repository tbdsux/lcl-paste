/*
  NOTE: /api/pastes/delete/[refid] -> deletes the paste using it's refId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

import { autoString } from '@utils/funcs';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

const getPasteRef = async (req: NextApiRequest, res: NextApiResponse) => {
  const { refid } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.deletePasteByRef(autoString(refid));

  if (q) {
    // redirect back to user's paste if successfully deleted
    res.status(200).json({ success: 'Paste is successfully removed' });
    return;
  }

  //TODO::
  res.status(404).json({ error: 'Not Found' });
};

export default methodHandler(withCustomSessionHandler(getPasteRef), ['DELETE']);

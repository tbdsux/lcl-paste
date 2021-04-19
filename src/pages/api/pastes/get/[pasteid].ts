/*
  NOTE: /api/pastes/get/[pasteid] -> returns the paste's data using the pasteId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';

import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const getPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pasteid } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));
  // automatically join all strings if array
  const q = await p.getPaste(autoString(pasteid));

  if (q) {
    return res.status(200).json(q);
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(getPaste, ['GET']);

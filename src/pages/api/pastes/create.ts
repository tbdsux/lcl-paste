/*
  NOTE: /api/pastes/create -> endpoint for creating a paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { Paste } from '@utils/interfaces/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

const createPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = useTokenAPI(req, res);
  const session = getSession(req, res);

  const data: Paste = req.body;

  const p = new PasteModel(token);
  const q = await p.createPaste(data, session ? true : false);

  if (q) {
    return res.status(200).json(q);
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default methodHandler(createPaste, ['PUT', 'POST']);

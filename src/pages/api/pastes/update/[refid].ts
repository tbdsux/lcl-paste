/*
  NOTE: /api/pastes/update/[refid] -> endpoint for updating a paste.
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { UpdatePaste } from '@utils/interfaces/paste';
import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { UpdatePasteQuery } from '@utils/interfaces/query';

export type ApiUpdatePaste = UpdatePasteQuery;

const updatePaste = async (req: NextApiRequest, res: NextApiResponse<ApiUpdatePaste>) => {
  const token = useTokenAPI(req, res);

  const data: UpdatePaste = req.body;
  const { refid } = req.query;

  const p = new PasteModel(token);
  const q = await p.updatePaste(autoString(refid), data);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(updatePaste), ['PUT', 'POST']);

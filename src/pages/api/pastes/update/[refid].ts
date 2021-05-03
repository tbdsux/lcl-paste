/*
  NOTE: /api/pastes/update/[refid] -> endpoint for updating a paste.
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { UpdatePaste } from '@utils/interfaces/paste';
import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { UpdatePasteQuery } from '@utils/interfaces/query';
import { getCodeLanguage } from '@lib/code';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

export type ApiUpdatePasteResponse = UpdatePasteQuery;

const updatePaste = async (req: NextApiRequest, res: NextApiResponse<ApiUpdatePasteResponse>) => {
  const { refid } = req.query;

  const token = useTokenAPI(req, res);
  const rdata: UpdatePaste = req.body;

  const data: UpdatePaste = {
    ...rdata,
    codeLanguage: getCodeLanguage(rdata.filename)
  };

  const p = new PasteModel(token);
  const q = await p.updatePaste(autoString(refid), data);

  res.status(q.code).json(q);
};

export default methodHandler(withCustomSessionHandler(updatePaste), ['PUT', 'POST']);

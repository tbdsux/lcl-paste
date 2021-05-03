/*
  NOTE: /api/pastes/get/[pasteid] -> returns the paste's data using the pasteId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';

import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetPasteByIdQuery, QueryErrorResponse } from '@utils/interfaces/query';

export type ApiGetPasteResponse = GetPasteByIdQuery;

const getPaste = async (req: NextApiRequest, res: NextApiResponse<ApiGetPasteResponse>) => {
  const { pasteid } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));

  // automatically join all strings if array
  const q = await p.getPaste(autoString(pasteid));

  res.status(q.code).json(q);
};

export default methodHandler(getPaste, ['GET']);

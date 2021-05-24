/*
  NOTE: /api/pastes/get/[pasteid] -> returns the paste's data using the pasteId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';

import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetPasteByIdQuery } from '@utils/interfaces/query';
import { join } from 'lodash';

export type ApiGetPasteResponse = GetPasteByIdQuery;

const getPaste = async (req: NextApiRequest, res: NextApiResponse<ApiGetPasteResponse>) => {
  const { pasteid } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));

  // automatically join all strings if array
  const q = await p.getPaste(join(pasteid));

  res.status(q.code).json(q);
};

export default methodHandler(getPaste, ['GET']);

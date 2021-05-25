/*
  NOTE: /api/pastes/get/[pasteid] -> returns the paste's data using the pasteId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { joinString } from '@ootiq/blank';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';

import { GetPasteByIdQuery } from '@utils/interfaces/query';

const getPaste = async (req: NextApiRequest, res: NextApiResponse<GetPasteByIdQuery>) => {
  const { pasteid } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));

  // automatically join all strings if array
  const q = await p.getPaste(joinString(pasteid));

  res.status(q.code).json(q);
};

export default methodHandler(getPaste, ['GET']);

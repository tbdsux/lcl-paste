/*
  NOTE: /api/pastes/delete/[refid] -> deletes the paste using it's refId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';

import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';
import { DeletePasteQuery } from '@utils/interfaces/query';
import { join } from 'lodash';

export type ApiDeletePasteResponse = DeletePasteQuery;

const deletePaste = async (req: NextApiRequest, res: NextApiResponse<ApiDeletePasteResponse>) => {
  const { refid } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.deletePasteByRef(join(refid));

  res.status(q.code).json(q);
};

export default methodHandler(withCustomSessionHandler(deletePaste), ['DELETE']);

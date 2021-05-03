/*
  NOTE: /api/pastes/get/ref/[refid] -> returns the paste data, if only the user is logged in.
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';

import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { ApiBaseQueryResponse, QueryErrorResponse } from '@utils/interfaces/query';
import { Paste } from '@utils/interfaces/paste';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

export interface ApiGetPasteRefResponse extends ApiBaseQueryResponse {
  isOwnedByCurrentUser: boolean;
  data: Paste;
}

const getPasteRef = async (req: NextApiRequest, res: NextApiResponse<ApiGetPasteRefResponse | QueryErrorResponse>) => {
  const { refid } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.getPasteByRef(autoString(refid));

  if (q.error) {
    res.status(q.code).json(q);
    return;
  }

  const isOwnedByCurrentUser = await p.verifyPasteByUserRef(q.data.user);

  res.status(200).json({ ...q, isOwnedByCurrentUser });
};

export default methodHandler(withCustomSessionHandler(getPasteRef), ['GET']);

/*
  NOTE: /api/raw/[pasteid]/[filename] -> returns the raw content of the paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import { GetRawPasteQuery } from '@utils/interfaces/query';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';

// middleware
import methodHandler from '@lib/middleware/methods';
import { join } from 'lodash';

type ApiGetRawPaste = GetRawPasteQuery;

const getRawPaste = async (req: NextApiRequest, res: NextApiResponse<ApiGetRawPaste>) => {
  const { pasteid, filename } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.getRawPasteContentOnly(join(pasteid), join(filename));

  if (q.error) {
    res.status(q.code).json(q);
    return;
  }

  res.status(200).end(q.data.content);
};

export default methodHandler(getRawPaste, ['GET']);

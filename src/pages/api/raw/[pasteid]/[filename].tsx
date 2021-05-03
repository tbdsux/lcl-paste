/*
  NOTE: /api/raw/[pasteid]/[filename] -> returns the raw content of the paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import { GetRawPasteQuery } from '@utils/interfaces/query';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

// middleware
import methodHandler from '@lib/middleware/methods';
import { autoString } from '@utils/funcs';

type ApiGetRawPaste = GetRawPasteQuery;

const getRawPaste = async (req: NextApiRequest, res: NextApiResponse<ApiGetRawPaste>) => {
  const { pasteid, filename } = req.query;

  const p = new PasteModel(useTokenAPI(req, res));
  const q = await p.getRawPasteContentOnly(autoString(pasteid), autoString(filename));

  if (q.error) {
    res.status(q.code).json(q);
    return;
  }

  res.status(200).end(q.data.content);
};

export default methodHandler(getRawPaste, ['GET']);

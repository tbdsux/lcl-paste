import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import { RawPasteResp } from '@utils/interfaces/query';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';

// middleware
import methodHandler from '@lib/middleware/methods';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = useTokenAPI(req, res);
  console.log('not yet here');
  res.status(200).end(token);
};

export default methodHandler(withCustomSessionHandler(get), ['GET']);

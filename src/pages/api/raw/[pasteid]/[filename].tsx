import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';

// middleware
import methodHandler from '@lib/middleware/methods';
import { RawPasteResp } from '@utils/interfaces/query';

const getRawPaste = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pasteid, filename } = req.query;

  const p = new PasteModel();
  const q: RawPasteResp = await p.getRawPasteContentOnly(Array.isArray(pasteid) ? pasteid.join() : pasteid);

  // validate if filename from `query` is similar to paste's
  if (q && q.filename === filename) {
    return res.status(200).send(q.content);
  }

  return res.status(404).send('Paste not found');
};

export default methodHandler(getRawPaste, ['GET']);

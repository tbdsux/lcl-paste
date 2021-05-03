/*
  NOTE: /api/pastes/create -> endpoint for creating a paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { nanoid } from 'nanoid';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { Paste } from '@utils/interfaces/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { CreatePasteQuery } from '@utils/interfaces/query';
import { getCodeLanguage } from '@lib/code';
import { getUser } from '@lib/hooks/getUser';

export type ApiCreatePasteResponse = CreatePasteQuery;

const createPaste = async (req: NextApiRequest, res: NextApiResponse<ApiCreatePasteResponse>) => {
  const token = useTokenAPI(req, res);

  const { isUser, name } = await getUser(req, res);

  const rdata: Paste = req.body;
  const data: Paste = {
    ...rdata,
    isCode: true,
    codeLanguage: getCodeLanguage(rdata.filename),
    pasteId: nanoid(50),
    isOwnedByUser: isUser,
    ownedByUsername: name
  };

  const p = new PasteModel(token);
  const q = await p.createPaste(data, isUser);

  res.status(q.code).json(q);
};

export default methodHandler(createPaste, ['PUT', 'POST']);

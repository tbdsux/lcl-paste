/*
  NOTE: /api/pastes/create -> endpoint for creating a paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { nanoid } from 'nanoid';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { getCodeLanguage } from '@lib/code';
import { getUser } from '@lib/hooks/getUser';
import { schemaValidate } from '@lib/validate';

import { errParseBody } from '@lib/body-parse';
import { CreatePasteQuery, QueryErrorResponse } from '@utils/interfaces/query';
import { ApiCreateBodySchema } from '@utils/schema/createBody';
import { ApiCreatePasteBody, Paste } from '@utils/interfaces/paste';

export type ApiCreatePasteResponse = CreatePasteQuery;
type ValidateCreateProps = { rdata: ApiCreatePasteBody; ok: boolean; err?: QueryErrorResponse };

// MAIN API
const createPaste = async (req: NextApiRequest, res: NextApiResponse<ApiCreatePasteResponse>) => {
  // get and check `post data` first
  const { rdata, ok, err } = await getPostCreateData(req);
  if (!ok) {
    res.status(err.code).json(err);
    return;
  }

  const token = getTokenAPI(req, res);
  const { isUser, name } = await getUser(req, res);

  const data: Paste = {
    createdDate: new Date().toISOString(),
    isCode: true,
    codeLanguage: getCodeLanguage(rdata.filename),
    pasteId: nanoid(50),
    isOwnedByUser: isUser,
    ownedByUsername: name,
    willExpire: !!rdata.expiryDate,
    ...rdata
  };

  const p = new PasteModel(token);
  const q = await p.createPaste(data, isUser);

  res.status(q.code).json(q);
};

// Getter and Validator for req.body
const getPostCreateData = async (req: NextApiRequest): Promise<ValidateCreateProps> => {
  const d: ApiCreatePasteBody = req.body;

  const r = await schemaValidate(ApiCreateBodySchema, d);
  if (r.error) {
    return errParseBody(r.message);
  }

  return { rdata: r.result, ok: true };
};

export default methodHandler(createPaste, ['PUT', 'POST']);

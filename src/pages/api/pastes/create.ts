/*
  NOTE: /api/pastes/create -> endpoint for creating a paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { nanoid } from 'nanoid';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { ApiCreatePasteBody, Paste } from '@utils/interfaces/paste';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { CreatePasteQuery, QueryErrorResponse } from '@utils/interfaces/query';
import { getCodeLanguage } from '@lib/code';
import { getUser } from '@lib/hooks/getUser';
import { isDataBlank } from '@lib/validate';

export type ApiCreatePasteResponse = CreatePasteQuery;
type ValidateCreateProps = { rdata: ApiCreatePasteBody; ok: boolean; err?: QueryErrorResponse };

// MAIN API
const createPaste = async (req: NextApiRequest, res: NextApiResponse<ApiCreatePasteResponse>) => {
  // get and check `post data` first
  const { rdata, ok, err } = getPostCreateData(req);
  if (!ok) {
    res.status(err.code).json(err);
    return;
  }

  const token = useTokenAPI(req, res);
  const { isUser, name } = await getUser(req, res);

  const data: Paste = {
    createdDate: new Date().toISOString(),
    isCode: true,
    codeLanguage: getCodeLanguage(rdata.filename),
    pasteId: nanoid(50),
    isOwnedByUser: isUser,
    ownedByUsername: name,
    ...rdata
  };

  const p = new PasteModel(token);
  const q = await p.createPaste(data, isUser);

  res.status(q.code).json(q);
};

// Getter and Validator for req.body
const getPostCreateData = (req: NextApiRequest): ValidateCreateProps => {
  const d: ApiCreatePasteBody = req.body;

  const requiredFields = ['filename', 'content'];
  for (let index = 0; index < requiredFields.length; index++) {
    const r = requiredFields[index];

    if (isDataBlank(d[r])) {
      return {
        rdata: null,
        ok: false,
        err: {
          error: true,
          code: 400,
          description: `'${r}' should not be blank.`
        }
      };
    }
  }

  // refactor data
  // this eleminates unnecessary datas to be included
  const rdata: ApiCreatePasteBody = {
    filename: d.filename,
    content: d.content,
    isPrivate: isDataBlank(d.isPrivate) ? false : d.isPrivate,
    description: isDataBlank(d.description) ? '' : d.description
  };

  return { rdata, ok: true };
};

export default methodHandler(createPaste, ['PUT', 'POST']);

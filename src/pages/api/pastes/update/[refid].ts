/*
  NOTE: /api/pastes/update/[refid] -> endpoint for updating a paste.
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { ApiUpdatePasteBody, UpdatePaste } from '@utils/interfaces/paste';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { QueryErrorResponse, UpdatePasteQuery } from '@utils/interfaces/query';
import { getCodeLanguage } from '@lib/code';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';
import { schemaValidate } from '@lib/validate';
import { ApiUpdateBodySchema } from '@utils/schema/updateBody';
import { errParseBody } from '@lib/body-parse';
import { join } from 'lodash';

export type ApiUpdatePasteResponse = UpdatePasteQuery;
type ValidateCreateProps = { rdata: ApiUpdatePasteBody; ok: boolean; err?: QueryErrorResponse };

const updatePaste = async (req: NextApiRequest, res: NextApiResponse<ApiUpdatePasteResponse>) => {
  const { rdata, ok, err } = await getUpdatePasteData(req);
  if (!ok) {
    res.status(err.code).json(err);
    return;
  }

  const { refid } = req.query;
  const token = getTokenAPI(req, res);

  const data: UpdatePaste = {
    ...rdata,
    willExpire: !!rdata.expiryDate,
    updated: true,
    updatedDate: new Date().toISOString()
  };

  // filename has been updated, get again the codelanguage
  if (rdata.filename) {
    data.codeLanguage = getCodeLanguage(rdata.filename);
  }

  const p = new PasteModel(token);
  const q = await p.updatePaste(join(refid), data);

  res.status(q.code).json(q);
};

// validate data in here before continuing
const getUpdatePasteData = async (req: NextApiRequest): Promise<ValidateCreateProps> => {
  const d: ApiUpdatePasteBody = req.body;

  // invalid data || blank data
  if (!(typeof d === 'object') || JSON.stringify(d) === '{}') {
    return errParseBody('Nothing was changed.', 200);
  }

  // object[key] -> returns undefined if key does not exist (maybe user did not update it?)
  const r = await schemaValidate(ApiUpdateBodySchema, d);

  if (!r[0]) {
    return errParseBody(r[1]);
  }

  return { rdata: d, ok: true };
};

export default methodHandler(withCustomSessionHandler(updatePaste), ['PUT', 'POST']);

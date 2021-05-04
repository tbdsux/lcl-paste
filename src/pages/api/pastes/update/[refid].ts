/*
  NOTE: /api/pastes/update/[refid] -> endpoint for updating a paste.
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { ApiUpdateBarePasteBody, ApiUpdatePasteBody, UpdatePaste } from '@utils/interfaces/paste';
import { autoString } from '@utils/funcs';
import { useTokenAPI } from '@lib/hooks/useTokenAPI';
import { QueryErrorResponse, UpdatePasteQuery } from '@utils/interfaces/query';
import { getCodeLanguage } from '@lib/code';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';
import { checkRequiredField, isDataBlank } from '@lib/validate';

export type ApiUpdatePasteResponse = UpdatePasteQuery;
type ValidateCreateProps = { rdata: ApiUpdatePasteBody; ok: boolean; err?: QueryErrorResponse };

const updatePaste = async (req: NextApiRequest, res: NextApiResponse<ApiUpdatePasteResponse>) => {
  const { rdata, ok, err } = getUpdatePasteData(req);
  console.log(ok);
  console.log(err);
  if (!ok) {
    res.status(err.code).json(err);
    return;
  }

  const { refid } = req.query;
  const token = useTokenAPI(req, res);

  const data: UpdatePaste = {
    ...rdata,
    codeLanguage: getCodeLanguage(rdata.filename)
  };

  const p = new PasteModel(token);
  const q = await p.updatePaste(autoString(refid), data);

  res.status(q.code).json(q);
};

const getUpdatePasteData = (req: NextApiRequest): ValidateCreateProps => {
  const d: ApiUpdateBarePasteBody = req.body;

  const requiredFields = ['filename', 'content'];
  const { error, data } = checkRequiredField(d, requiredFields);

  if (error) {
    return data;
  }

  const rdata: ApiUpdatePasteBody = {
    updated: true,
    updatedDate: new Date().toISOString(),
    filename: d.filename,
    content: d.content,
    isPrivate: isDataBlank(d.isPrivate) ? false : d.isPrivate,
    description: isDataBlank(d.description) ? '' : d.description
  };

  return { rdata, ok: true };
};

export default methodHandler(withCustomSessionHandler(updatePaste), ['PUT', 'POST']);

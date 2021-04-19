import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { getSubId } from '@utils/funcs';
import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import { SessionProps, UserCustomSessionProps } from '@utils/interfaces/user';

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  console.log(session);
  res.end(session);

  // let data: Paste | UpdatePaste;

  // const d = req.query;
  // console.log(d);

  // data = <UpdatePaste>{
  //   updated: true
  // };

  // res.json(data);
};

export default api;

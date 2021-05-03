import type { NextApiRequest, NextApiResponse } from 'next';

import { useTokenAPI } from '@lib/hooks/useTokenAPI';

// middleware
import methodHandler from '@lib/middleware/methods';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';
import { UserModel } from '@lib/models/user';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const u = new UserModel(useTokenAPI(req, res));
  const user = await u.getUser();

  res.status(200).json(user);
};

export default methodHandler(withCustomSessionHandler(get), ['GET']);

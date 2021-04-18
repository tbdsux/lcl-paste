import { getSession } from '@auth0/nextjs-auth0';
import { SessionProps } from '@utils/interfaces/user';
import { NextApiRequest, NextApiResponse } from 'next';

// return the user token
export const useTokenAPI = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user }: SessionProps = getSession(req, res);

    return user.token;
  } catch {
    return process.env.FAUNADB_LCLPASTE_PUBLIC_KEY;
  }
};

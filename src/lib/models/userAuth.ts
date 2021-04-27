// vased from:: https://github.com/TheBoringDude/nextjs-fauna-auth0/blob/main/src/fauna/models/user-model.ts

import { adminClient, getClient, q } from '@lib/fauna';

type GetTokenRespProps = {
  ref: object;
  ts: number;
  instance: object;
  secret: string;
};

const obtainFaunaDBToken = async (user: string): Promise<string | undefined> => {
  return adminClient
    .query(
      q.Create(q.Tokens(), {
        instance: q.Select('ref', q.Get(q.Match(q.Index('user_by_id'), user)))
      })
    )
    .then((res: GetTokenRespProps) => res?.secret) // return only the secret
    .catch((e) => {
      console.error(e);
      return undefined;
    });
};

const invalidateFaunaDBToken = async (token: string) => {
  return await getClient(token).query(q.Logout(true));
};

export { obtainFaunaDBToken, invalidateFaunaDBToken };

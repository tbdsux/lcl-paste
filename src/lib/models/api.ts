import { UserProfile } from '@auth0/nextjs-auth0';
import { adminClient, q } from '@lib/fauna';
import { ApiQueryResponse } from '@utils/interfaces/query';

import { nanoid } from 'nanoid';

export class ApiModel {
  // generate user api key
  _generateApiKey(sub: string) {
    return `f${Buffer.from(sub).toString('base64')}-lp${nanoid(25)}`;
  }

  // get api of user with it's sub
  async getApi(sub: string) {
    return adminClient
      .query(q.Get(q.Match(q.Index('apiByUserSub'), sub)))
      .then((r: ApiQueryResponse) => r.data.token)
      .catch(() => undefined);
  }

  // db store api
  async createApiKey(user: UserProfile) {
    const api = this._generateApiKey(user.sub);

    return adminClient
      .query(
        q.Create(q.Collection('apis'), {
          data: {
            token: api,
            user: user
          }
        })
      )
      .then(() => api) // return the generated api
      .catch(() => undefined);
  }
}

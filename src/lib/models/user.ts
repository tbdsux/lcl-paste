import { getClient, q } from '@lib/fauna';
import { UserDataRefProps } from '@utils/interfaces/user';
import { Client } from 'faunadb';

export class UserModel {
  _client: Client;
  constructor(token: string) {
    this._client = getClient(token);
  }

  async getUser(): Promise<UserDataRefProps | undefined> {
    return this._client.query(q.Get(q.CurrentIdentity())).catch(() => undefined);
  }
}

import { adminClient, q } from '@lib/fauna';
import { getQuery, getQueryError } from '@lib/handleQuery';
import { BaseStatsProps, GetStatsQuery } from '@utils/interfaces/query';

export class Stats {
  // get stats
  async getStats(): Promise<GetStatsQuery> {
    return adminClient
      .query(q.Map(['users', 'pastes'], q.Lambda('col', q.Count(q.Documents(q.Collection(q.Var('col')))))))
      .then((r: number[]) =>
        getQuery<BaseStatsProps>({
          users: r[0],
          pastes: r[1]
        })
      )
      .catch((e) => getQueryError(e));
  }
}

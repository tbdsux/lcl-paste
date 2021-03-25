import { q, adminClient } from '../fauna';
import { Paste } from '@utils/interfaces/paste';
import { PasteQueryResponse } from '@utils/interfaces/query';

// main paste model
export class PasteModel {
  // create a new paste
  async createPaste(data: Paste) {
    return adminClient
      .query(
        q.Create(q.Collection('pastes'), {
          data: data
        })
      )
      .catch(() => undefined);
  }

  // retrieve paste from id string
  async getPaste(id: string) {
    return adminClient
      .query(q.Get(q.Match(q.Index('pasteByID'), id)))
      .then((res: PasteQueryResponse) => res.data)
      .catch(() => undefined);
  }

  // get latest pastes
  async getLatestPastes() {
    return adminClient
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('latestPublicPastesByDate'), false)),
          q.Lambda(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .catch(() => undefined);
  }
}

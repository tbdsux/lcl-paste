import { q, adminClient } from '../fauna';
import { Paste } from '@utils/interfaces/paste';

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
}

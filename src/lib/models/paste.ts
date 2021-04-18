import { q, adminClient, getClient } from '../fauna';
import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import { MultipleRespPastes, PasteQueryResponse, RawPasteResp } from '@utils/interfaces/query';
import { Client } from 'faunadb';

// main paste model
export class PasteModel {
  token: string
  client: Client

  constructor(token: string) {
    this.token = token
    this.client = getClient(token)
  }

  // create a new paste
  async createPaste(data: Paste) {
    return this.client
      .query(
        q.Create(q.Collection('pastes'), {
          data: data
        })
      )
      .catch(() => undefined);
  }

  // retrieve paste from id string
  async getPaste(id: string) {
    return this.client
      .query(q.Get(q.Match(q.Index('pasteByID'), id)))
      .then((res: PasteQueryResponse) => res.data)
      .catch(() => undefined);
  }

  // get paste by it's ref id
  async getPasteByRef(id: string) {
    return this.client
      .query(q.Get(q.Ref(q.Collection('pastes'), id)))
      .then((res: PasteQueryResponse) => res.data)
      .catch(() => undefined);
  }

  // get latest pastes
  async getLatestPastes() {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('latestPublicPastesByDate'), false)),
          q.Lambda(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .then((res: MultipleRespPastes) => res.data)
      .catch((e) => console.error(e));
  }

  // get user's paste with subId
  async getUserPastes(subId: string) {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('pastesByUser'), subId)),
          q.Lambda(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .catch(() => undefined);
  }

  // get pasteid raw content
  async getRawPasteContentOnly(id: string) {
    return this.client
      .query(q.Get(q.Match(q.Index('pasteByID_onlyContent'), id)))
      .then((res: PasteQueryResponse) => {
        return <RawPasteResp>{
          content: res.data.content,
          filename: res.data.filename
        };
      })
      .catch(() => undefined);
  }

  // update paste
  async updatePaste(id: string, data: UpdatePaste) {
    return this.client
      .query(q.Update(q.Ref(q.Collection('pastes'), id), { data: data }))
      .then((r: PasteQueryResponse) => r.data)
      .catch((e) => {
        console.error(e);
        undefined;
      });
  }

  // delete paste
  async deletePasteByRef(id: string) {
    return this.client.query(q.Delete(q.Ref(q.Collection('pastes'), id))).catch(() => undefined);
  }
}

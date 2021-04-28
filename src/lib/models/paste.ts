import { q, adminClient, getClient } from '../fauna';
import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import { GetPasteReponse, MultipleRespPastes, PasteQueryResponse, RawPasteResp } from '@utils/interfaces/query';
import { Client, Expr, Get } from 'faunadb';
import { getSession } from '@auth0/nextjs-auth0';

// main paste model
export class PasteModel {
  token: string;
  client: Client;

  constructor(token: string) {
    this.token = token;
    this.client = getClient(token);
  }

  // create a new paste
  async createPaste(data: Paste, isUser: boolean) {
    return this.client
      .query(
        q.Create(q.Collection('pastes'), {
          data: {
            ...data,
            user: isUser ? q.CurrentIdentity() : {}
          }
        })
      )
      .catch(() => undefined);
  }

  // retrieve paste from id string
  async getPaste(id: string): Promise<GetPasteReponse | undefined> {
    return this.client
      .query(
        q.Let(
          {
            pasteDoc: q.Get(q.Match(q.Index('pasteByID'), id))
          },
          {
            paste: q.Select('data', q.Var('pasteDoc')),
            user: q.If(
              q.Select(['data', 'isOwnedByUser'], q.Var('pasteDoc')),
              q.Select('data', q.Get(q.Select(['data', 'user'], q.Var('pasteDoc')))),
              null
            )
          }
        )
      )
      .catch(() => undefined);
  }

  // get paste by it's ref id
  async getPasteByRef(id: string) {
    return this.client
      .query(q.Get(q.Ref(q.Collection('pastes'), id)))
      .then((res: PasteQueryResponse) => res.data)
      .catch(() => undefined);
  }

  async verifyPasteByUserRef(userRef: Expr) {
    return this.client.query(q.Equals(userRef, q.CurrentIdentity()));
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
  async getUserPastes() {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('pastes_by_userRef'), q.CurrentIdentity())),
          q.Lambda('ref', q.Get(q.Var('ref')))
        )
      )
      .catch((e) => {
        console.error(e);
        return undefined;
      });
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

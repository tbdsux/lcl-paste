import { Expr } from 'faunadb';

interface ApiProps {
  owner: Object | Expr; // a reference
  user: string; // user.sub
  key: string;
}

interface ApiRefProps {
  ref: Object;
  ts: number;
  data: ApiProps;
}

export type { ApiProps, ApiRefProps };

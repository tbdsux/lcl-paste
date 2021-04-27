import { UserProfile } from '@auth0/nextjs-auth0';

interface UserCustomSessionProps extends UserProfile {
  token?: string;
  api_key?: string;
}

type SessionProps = { user: UserCustomSessionProps };

export type { UserCustomSessionProps, SessionProps };

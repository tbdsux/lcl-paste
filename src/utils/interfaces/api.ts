import { UserProfile } from '@auth0/nextjs-auth0';

export interface Api {
  token: string;
  user: UserProfile;
}

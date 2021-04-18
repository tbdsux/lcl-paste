import { UserProfile } from '@auth0/nextjs-auth0';

export interface UserCustomSessionProps extends UserProfile {
  token?: string;
}

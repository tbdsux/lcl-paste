import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

import { useHasMounted } from '@lib/hooks/useHasMounted';

import { LinkButton } from './shared/link';

export const UserNav = () => {
  const { user } = useUser();
  const mounted = useHasMounted();

  if (!mounted) return null;

  return (
    <>
      {user && mounted ? (
        <>
          <li className="mx-6 my-1 md:my-0">
            <LinkButton href="/user/pastes" className="font-bold tracking-wider">
              Pastes
            </LinkButton>
          </li>
          <li className="pl-8 my-1 md:my-0 inline-flex items-center border-l">
            {/* basic user info */}
            <Image src={user.picture} height="40" width="40" className="rounded-full" />
            <Link href="/user">
              <a className="ml-2 text-secondary-700">{user.name}</a>
            </Link>
            {/* logout button */}
            <a href="/api/auth/logout" className="ml-4 text-secondary-400 hover:text-primary-500" title="Logout">
              <div className="h-7 w-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </a>
          </li>
        </>
      ) : (
        <li className="ml-6 my-1 md:my-0">
          <Link href="/api/auth/login">
            <a title="User Login" className="py-2 px-8 bg-primary-500 hover:bg-primary-600 text-white">
              Login
            </a>
          </Link>
        </li>
      )}
    </>
  );
};

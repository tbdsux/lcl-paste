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
            <LinkButton href="/user/pastes">Pastes</LinkButton>
          </li>
          <li className="pl-8 my-1 md:my-0 inline-flex items-center border-l text-sm">
            {/* basic user info */}
            <Link href="/user">
              <a title="Goto User Page" className="text-secondary-500 hover:text-primary-500 inline-flex items-center">
                <Image src={user.picture} height="30" width="30" className="rounded-full" />
                <span className="ml-2">{user.name}</span>
              </a>
            </Link>
            {/* logout button */}
            <a href="/api/auth/logout" className="ml-4 text-secondary-400 hover:text-primary-500" title="Logout">
              <div className="h-6 w-6">
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
            <a title="User Login" className="text-sm py-2 px-8 bg-primary-400 hover:bg-primary-500 text-white">
              Login
            </a>
          </Link>
        </li>
      )}
    </>
  );
};

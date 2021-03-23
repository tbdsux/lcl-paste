import Link from 'next/link';

export default function Navigation({ user }) {
  return (
    <nav className="py-6 w-11/12 mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-extrabold tracking-wide">Local Paste</h1>
      <ul className="inline-flex items-center text-lg text-secondary-600">
        <li className="mx-6">
          <Link href="/latest">
            <a className="hover:text-primary-600">Latest</a>
          </Link>
        </li>
        {user ? (
          <>
            <li className="mx-6">
              <Link href="/user/pastes">
                <a className="hover:text-primary-600">Pastes</a>
              </Link>
            </li>
            <li className="pl-8 inline-flex items-center border-l">
              <img src={user.picture} className="h-10 w-10 rounded-full" />
              <span className="ml-2 text-secondary-700">{user.name}</span>
            </li>
          </>
        ) : (
          <li className="ml-6">
            <Link href="/api/auth/login">
              <a className="py-2 px-8 bg-primary-500 hover:bg-primary-600 text-white">Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

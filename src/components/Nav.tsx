import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="py-6 w-11/12 mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-extrabold tracking-wide">Local Paste</h1>
      <ul className="inline-flex items-center text-lg">
        <li className="mx-4">
          <Link href="/latest">
            <a className="hover:text-primary-600">Latest</a>
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/login">
            <a className="py-2 px-8 bg-primary-500 hover:bg-primary-600 text-white">Login</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

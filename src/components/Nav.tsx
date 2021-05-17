import { useState } from 'react';
import Link from 'next/link';
import { LinkButton } from './shared/link';
import { UserNav } from './userNav';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-6 w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link href="/">
            <a title="Return Home">Local Paste</a>
          </Link>
        </h1>
        <button className="h-6 w-6 md:hidden" onClick={() => setOpen(open ? false : true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <ul className="hidden md:inline-flex mt-2 md:mt-0 items-center text-secondary-600">
        <li className="mx-6">
          <LinkButton id="link-latest" href="/latest" className="font-bold tracking-wider">
            Latest
          </LinkButton>
        </li>
        <UserNav />
      </ul>
      {open ? (
        <ul className={`md:hidden inline-flex flex-col mt-2 md:mt-0 items-center text-secondary-600`}>
          <li className="mx-6 my-1 md:my-0">
            <LinkButton id="link-latest" href="/latest" className="font-bold tracking-wider">
              Latest
            </LinkButton>
          </li>
          <UserNav />
        </ul>
      ) : null}
    </nav>
  );
};

export default Navigation;

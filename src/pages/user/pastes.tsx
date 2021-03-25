import Link from 'next/link';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import Navigation from '@components/Nav';

import { PasteQueryResponse } from '@utils/interfaces/query';

export default withPageAuthRequired(function UserPastes() {
  const { data: pastes } = useSWR('/api/user/pastes');

  return (
    <Layout title="User Pastes">
      <Navigation />

      <hr />

      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">My Latest Pastes</h3>

          <ul className="mt-6">
            {pastes.map((paste: PasteQueryResponse) => (
              <li className="my-2" key={paste.data.pasteId}>
                <Link href={`/p/${paste.data.pasteId}`}>
                  <a
                    className="border border-secondary-200 py-3 px-6 flex items-center justify-between rounded hover:border-primary-500"
                    title="View paste"
                  >
                    <div className="inline-flex">
                      <h4>
                        {paste.data.filename}{' '}
                        <span className="text-secondary-600">
                          {paste.data.description != '' ? `(${paste.data.description})` : null}
                        </span>
                      </h4>
                    </div>
                    <div className="inline-flex items-center text-secondary-500">
                      <div className="mr-8">
                        <span className="bg-secondary-400 text-xs p-1 text-white mx-1">
                          {paste.data.isPrivate ? 'private' : 'public'}
                        </span>
                        <span className="text-xs">[{new Date(paste.data.createdDate).toUTCString()}]</span>
                      </div>
                      <button className="h-6 w-6 mx-1 hover:text-primary-500" title="Update paste">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                      <button className="h-6 w-6 mx-1 hover:text-primary-500" title="Delete paste">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
});

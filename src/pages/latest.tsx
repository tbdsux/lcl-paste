import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import { PasteQueryResponse } from '@utils/interfaces/query';
import useSWR from 'swr';

export default function Latest() {
  // retrieve all posts
  const { data: pastes } = useSWR('/api/pastes/latest');

  return (
    <Layout title="Latest Pastes">
      <Navigation />

      <hr />

      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">Latest Pastes</h3>

          <ul className="mt-6">
            {pastes.map((paste: PasteQueryResponse) => (
              <li className="my-2" key={paste.data.pasteId}>
                <Link href={`/p/${paste.data.pasteId}`}>
                  <a
                    className="border border-secondary-200 py-3 px-6 flex items-center justify-between rounded hover:border-primary-500"
                    title="View paste"
                  >
                    <div className="w-1/2 justify-start inline-flex">
                      <h4 className="truncate">
                        {paste.data.filename}{' '}
                        <span className="text-secondary-500 text-sm">
                          {paste.data.description ? `(${paste.data.description})` : null}
                        </span>
                      </h4>
                    </div>
                    <div className="w-1/2 justify-end inline-flex items-center">
                      <span className="text-sm text-secondary-400 ml-8">
                        @{paste.data.user ? paste.data.user.name : 'anonymous'}{' '}
                        <span className="text-xs text-secondary-300">
                          [{new Date(paste.data.createdDate).toUTCString()}]
                        </span>
                      </span>
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
}

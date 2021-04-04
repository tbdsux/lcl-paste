import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import { BlockPasteInfo } from '@components/pastes/Block';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { PastesSwrResponse } from '@utils/interfaces/paste';

export default withPageAuthRequired(function UserPastes() {
  const { data: pastes }: PastesSwrResponse = useSWR('/api/user/pastes');

  if (!pastes) {
    return <p>Loading...</p>;
  }

  return (
    <Layout title="User Pastes">
      <Navigation />

      <hr />

      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">My Latest Pastes</h3>

          <ul className="mt-6">
            {pastes.map((paste: PasteQueryResponse) => (
              <BlockPasteInfo key={paste.data.pasteId} paste={paste} isUserPage={true} />
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
});

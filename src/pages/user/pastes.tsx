import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import { BlockPasteInfo } from '@components/pastes/Block';
import { Loading } from '@components/Loading';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { PastesSwrResponse } from '@utils/interfaces/paste';

export default withPageAuthRequired(function UserPastes() {
  const { data: pastes }: PastesSwrResponse = useSWR('/api/pastes/user');

  if (!pastes) {
    return <Loading title="User Pastes" />;
  }

  return (
    <Layout title="User Pastes">
      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">My Latest Pastes</h3>

          <ul className="mt-6">
            {pastes.map((paste: PasteQueryResponse, index) => (
              <BlockPasteInfo key={index} paste={paste} isUserPage={true} />
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
});

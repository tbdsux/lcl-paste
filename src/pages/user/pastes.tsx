import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import { BlockPasteInfo } from '@components/pastes/Block';
import { Loading } from '@components/Loading';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { ApiGetUserPastes } from 'pages/api/pastes/user';
import Error from 'next/error';

export default withPageAuthRequired(function UserPastes() {
  const { data: pastes } = useSWR<ApiGetUserPastes>('/api/pastes/user');

  if (!pastes) {
    return <Loading title="User Pastes" />;
  }

  if (pastes.error) {
    return <Error statusCode={pastes.code} />;
  }

  return (
    <Layout title="User Pastes">
      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">My Latest Pastes</h3>

          <ul className="mt-6">
            {pastes.data.map((paste: PasteQueryResponse, index) => (
              <section key={index}>
                <BlockPasteInfo paste={paste} isUserPage={true} /> <hr className="border-secondary-100 my-1" />
              </section>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
});

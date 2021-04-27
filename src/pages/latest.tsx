import useSWR from 'swr';

import Layout from '@components/Layout';
import { BlockPasteInfo } from '@components/pastes/Block';
import { Loading } from '@components/Loading';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { PastesSwrResponse } from '@utils/interfaces/paste';

export default function Latest() {
  // retrieve all posts
  const { data: pastes }: PastesSwrResponse = useSWR('/api/pastes/latest');

  if (!pastes) {
    return <Loading title="Latest Pastes" />;
  }

  return (
    <Layout title="Latest Pastes">
      {pastes && (
        <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">Latest</h3>

          <ul className="mt-6">
            {pastes.map((paste: PasteQueryResponse, index) => (
              <BlockPasteInfo key={index} paste={paste} isUserPage={false} />
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}

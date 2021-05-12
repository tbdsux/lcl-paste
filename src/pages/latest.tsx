import useSWR from 'swr';

import Layout from '@components/Layout';
import { BlockPasteInfo } from '@components/pastes/Block';
import { Loading } from '@components/Loading';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { ApiGetLatestResponse } from './api/pastes/latest';
import Error from 'next/error';
import { RenderLatestPastes } from '@components/pastes/render/latestPastes';

export default function Latest() {
  return (
    <Layout title="Latest Pastes">
      <div className="py-8 w-5/6 mx-auto">
          <h3 className="font-bold tracking-wide text-xl">Latest</h3>

          <RenderLatestPastes />
        </div>
    </Layout>
  );
}

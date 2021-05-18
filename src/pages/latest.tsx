import Layout from '@components/Layout';
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

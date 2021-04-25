import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';

import MainEditor from '@components/Editor';
import { Loading } from '@components/Loading';

import { autoString } from '@utils/funcs';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';

export default withPageAuthRequired(function UserPage() {
  const router = useRouter();
  const { refid, pasteid } = router.query;

  const { data: paste } = useSWR(refid ? `/api/pastes/get/ref/${refid}` : null);

  if (!paste) {
    return <Loading title="Update Paste" />;
  }

  if (paste.data.pasteId != pasteid) {
    // the pasteid in the url is not similar from the paste's pasteid
    return <Error statusCode={404} />;
  }

  if (!paste.isOwnedByCurrentUser) {
    // the paste is not owned by the current user
    return <Error statusCode={403} />;
  }

  return (
    <Layout title={`${paste.data.filename} - Update`}>
      <Navigation />
      <hr />

      {paste.data && <MainEditor update={true} data={paste.data} refid={autoString(refid)} />}
    </Layout>
  );
});

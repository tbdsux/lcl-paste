import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';

import MainEditor from '@components/Editor';
import { Loading } from '@components/Loading';

import { autoString } from '@utils/funcs';

export default withPageAuthRequired(function UserPage() {
  const router = useRouter();
  const { refid, pasteid } = router.query;

  const { data: paste, error } = useSWR(refid ? `/api/pastes/get/ref/${refid}` : null);

  if (!paste) {
    return <Loading title="Update Paste" />;
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (paste.pasteId != pasteid) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {paste && (
        <MainEditor title={`${paste.filename} - Update`} update={true} data={paste} refid={autoString(refid)} />
      )}
    </>
  );
});

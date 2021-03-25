import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useUser } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import Navigation from '@components/Nav';

import Highlight from 'react-highlight';

export default function ViewPaste() {
  // user
  const { user, error: userError, isLoading } = useUser();

  const router = useRouter();
  const { pasteid } = router.query;

  const { data: paste, error } = useSWR(pasteid ? `/api/pastes/get/${pasteid}` : null);

  if (!paste) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Layout title={paste.filename}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@10.7.1/styles/a11y-light.css" />
      </Head>

      <Navigation user={user} />

      <hr />

      <div className="w-5/6 mx-auto my-8">
        <div className="py-2 text-secondary-700">{paste.filename}</div>
        <div className="border border-secondary-200 p-4 rounded-md">
          <Highlight className="text text-sm">{paste.content}</Highlight>
        </div>
      </div>
    </Layout>
  );
}

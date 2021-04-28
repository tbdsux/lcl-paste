import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import { Loading } from '@components/Loading';

import Highlight from 'react-highlight';
import { useUser } from '@auth0/nextjs-auth0';

export default function ViewPaste() {
  const { user } = useUser();

  const router = useRouter();
  const { pasteid } = router.query;

  const { data: paste, error } = useSWR(pasteid ? `/api/pastes/get/${pasteid}` : null);

  if (!paste) {
    return <Loading title="Loading Paste..." />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Layout title={paste.filename}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/vs.css" />
      </Head>

      <div className="w-5/6 mx-auto my-8">
        <div className="py-2 flex items-center justify-between">
          <div>
            <h4 className="text-primary-500 text-lg font-bold tracking-wide">{paste.filename}</h4>
            <p className="ml-2 text-secondary-500 mt-1">{paste.description}</p>
          </div>
          {user && <div></div>}
          <Link href={`/api/raw/${paste.pasteId}/${paste.filename}`}>
            <a
              className="bg-secondary-400 hover:bg-secondary-500 text-white py-1 px-3 rounded-md text-sm tracking-wide"
              target="_blank"
            >
              raw
            </a>
          </Link>
        </div>
        <div className="border border-secondary-200 p-4 rounded-md">
          <Highlight className={`text-sm ${paste.codeLanguage}`}>{paste.content}</Highlight>
        </div>
      </div>
    </Layout>
  );
}

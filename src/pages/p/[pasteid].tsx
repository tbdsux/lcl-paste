import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@components/Layout';
import { Loading } from '@components/Loading';

import Highlight from 'react-highlight';
import { useUser } from '@auth0/nextjs-auth0';
import { GetPasteResponse, QueryErrorResponse } from '@utils/interfaces/query';
import { ApiGetPasteResponse } from 'pages/api/pastes/get/[pasteid]';
import Error from 'next/error';

export default function ViewPaste() {
  const { user } = useUser();

  const router = useRouter();
  const { pasteid } = router.query;

  // get response
  const { data: paste } = useSWR<ApiGetPasteResponse>(pasteid ? `/api/pastes/get/${pasteid}` : null);

  if (!paste) {
    return <Loading title="Loading Paste..." />;
  }

  if (paste.error) {
    return <Error statusCode={paste.code} />;
  }

  return (
    <Layout title={paste.data.paste.filename}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/vs.css" />
      </Head>

      <div className="w-5/6 mx-auto my-8">
        <div className="py-2 flex items-center justify-between">
          <div>
            <h4 id="paste-filename" className="text-primary-500 text-lg font-bold tracking-wide">
              {paste.data.paste.filename}
            </h4>
            <p id="paste-description" className="ml-2 text-secondary-500 mt-1">
              {paste.data.paste.description}
            </p>
          </div>
          <div className="inline-flex text-sm">
            {user && user?.sub == paste.data.user?.user && (
              <Link href={`/user/pastes/update/${paste.data.id}/${paste.data.paste.pasteId}`}>
                <a className="mr-2 bg-primary-400 hover:bg-primary-500 p-1 text-white rounded-md">update</a>
              </Link>
            )}
            <Link href={`/api/raw/${paste.data.paste.pasteId}/${paste.data.paste.filename}`}>
              <a
                className="bg-secondary-400 hover:bg-secondary-500 text-white py-1 px-3 rounded-md tracking-wide"
                target="_blank"
              >
                raw
              </a>
            </Link>
          </div>
        </div>
        <div className="border border-secondary-200 p-4 rounded-md">
          <Highlight className={`text-sm ${paste.data.paste.codeLanguage}`}>{paste.data.paste.content}</Highlight>
        </div>
      </div>
    </Layout>
  );
}

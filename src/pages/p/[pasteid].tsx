import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@components/Layout';
import { Loading } from '@components/Loading';

import Highlight from 'react-highlight';
import { useUser } from '@auth0/nextjs-auth0';
import { GetPasteReponse } from '@utils/interfaces/query';

export default function ViewPaste() {
  const { user } = useUser();

  const router = useRouter();
  const { pasteid } = router.query;

  const { data, error } = useSWR<GetPasteReponse>(pasteid ? `/api/pastes/get/${pasteid}` : null);

  if (!data) {
    return <Loading title="Loading Paste..." />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Layout title={data.paste.filename}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/vs.css" />
      </Head>

      <div className="w-5/6 mx-auto my-8">
        <div className="py-2 flex items-center justify-between">
          <div>
            <h4 className="text-primary-500 text-lg font-bold tracking-wide">{data.paste.filename}</h4>
            <p className="ml-2 text-secondary-500 mt-1">{data.paste.description}</p>
          </div>
          <div className="inline-flex text-sm">
            {user.sub == data.user?.user && (
              <Link href="/">
                <a className="mr-2 bg-primary-400 hover:bg-primary-500 p-1 text-white rounded-md">update</a>
              </Link>
            )}
            <Link href={`/api/raw/${data.paste.pasteId}/${data.paste.filename}`}>
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
          <Highlight className={`text-sm ${data.paste.codeLanguage}`}>{data.paste.content}</Highlight>
        </div>
      </div>
    </Layout>
  );
}

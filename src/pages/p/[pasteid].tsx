import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import { GetServerSideProps } from 'next';
import { useUser } from '@auth0/nextjs-auth0';

import { jsonify } from '@ootiq/blank';

import Layout from '@components/Layout';

import Highlight from 'react-highlight';

import { ApiGetPasteResponse } from 'pages/api/pastes/get/[pasteid]';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { PasteModel } from '@lib/models/paste';
import { joinString } from '@ootiq/blank';

type ViewPasteProps = {
  pasteid: string;
  initialPaste: ApiGetPasteResponse;
};

export const getServerSideProps: GetServerSideProps<ViewPasteProps> = async (context) => {
  const { pasteid } = context.params;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const p = new PasteModel(getTokenAPI(context.req, context.res));

  // automatically join all strings if array
  const q = await p.getPaste(joinString(pasteid));

  return {
    props: {
      pasteid: joinString(pasteid),
      initialPaste: jsonify(q)
    }
  };
};

export default function ViewPaste({ pasteid, initialPaste }: ViewPasteProps) {
  const { user } = useUser();

  // get response
  const { data: paste } = useSWR<ApiGetPasteResponse>(pasteid ? `/api/pastes/get/${pasteid}` : null, {
    initialData: initialPaste
  });

  console.log(paste);

  if (paste.error) {
    return <Error statusCode={paste.code} />;
  }

  const getPrivacy = paste.data.paste.isPrivate ? 'private' : 'public';
  const getUser = paste.data.paste.ownedByUsername ? paste.data.paste.ownedByUsername : 'anonymous';
  const getExpiryDate = paste.data.paste.willExpire ? new Date(paste.data.paste.expiryDate).toLocaleString() : null;

  return (
    <Layout title={paste.data.paste.filename}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/vs.css" />
      </Head>

      <div className="w-5/6 mx-auto my-8">
        <div className="p-6 border border-primary-300 rounded-lg">
          <div className="pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h4 id="paste-filename" className="text-primary-500 text-lg font-bold tracking-wider">
                {paste.data.paste.filename}
              </h4>
              <p id="paste-description" className="ml-2 text-secondary-500 mt-1 tracking-wide">
                {paste.data.paste.description}
              </p>
            </div>
            <div className="inline-flex text-sm mt-3 sm:mt-0">
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
          <hr className="my-4" />
          {paste.data.paste.willExpire && user?.sub == paste.data.user?.user && (
            <p className="text-secondary-400 text-sm text-right my-2">
              expire in: <span className="underline">{getExpiryDate}</span>
            </p>
          )}
          <div className="p-4 rounded-md shadow-2xl border border-secondary-200 relative">
            <div className="absolute top-1 right-1 inline-flex items-center">
              {/* redirect to carbon */}
              <a
                title="Create Carbon Image"
                className="text-primary-400 hover:text-primary-500"
                target="_blank"
                href={`https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=${
                  paste.data.paste.codeLanguage
                }&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=${encodeURI(
                  paste.data.paste.content
                )}`}
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* end redirect to carbon */}
              {/* copy button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.data.paste.content);
                }}
                className="text-secondary-400 hover:text-secondary-500"
                title="Copy Code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </button>
              {/* end copy button */}
            </div>
            <Highlight className={`text-sm ${paste.data.paste.codeLanguage}`}>{paste.data.paste.content}</Highlight>
          </div>

          <div className="flex items-center justify-between text-sm mt-6">
            <p className="bg-secondary-400 text-secondary-50 p-1">{getPrivacy}</p>
            <p className="text-secondary-600 underline">@{getUser}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

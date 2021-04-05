import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import Layout from '@components/Layout';
import Nav from '@components/Nav';
import { Loading } from '@components/Loading';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function UserPage() {
  const { user } = useUser();

  const btnCopy = useRef<HTMLButtonElement>(null);
  const btnGet = useRef<HTMLButtonElement>(null);

  const [api, setApi] = useState<string>(null);
  const { data } = useSWR('/api/get/key');

  useEffect(() => {
    if (data) {
      setApi(data.api);
    }
  }, [data]);

  const getApi = () => {
    btnGet.current.innerHTML = 'Generating...';
    fetch(`/api/get/key`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setApi(data.api);
      })
      .catch((e) => console.error(e));
  };

  if (!data) {
    return <Loading title="User Pastes" />;
  }

  return (
    <Layout title={`${user.name} - User`}>
      <Nav />

      <hr />

      <section className="w-4/5 mx-auto py-12">
        <div className="flex items-center justify-center border rounded-md border-secondary-200 shadow p-8">
          <Image src={user.picture} height="200" width="200" className="rounded-full" />
          <div className="ml-8">
            <h3 className="text-5xl font-black tracking-wide mb-2 text-primary-500">{user.name}</h3>
            <p className="bg-secondary-400 p-1 text-white text-right">@{user.sub.split('|')[0]}</p>
          </div>
        </div>

        {data && (
          <div className="mt-4">
            <h3>Api Key: </h3>
            <section className="py-2 px-4 bg-secondary-100 rounded-md flex items-center justify-between">
              <p>{api}</p>
              {api ? (
                <button
                  ref={btnCopy}
                  onClick={() => {
                    btnCopy.current.innerHTML = 'Copied';
                    navigator.clipboard.writeText(api);
                  }}
                  className="py-1 px-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-white"
                >
                  Copy
                </button>
              ) : (
                <button
                  ref={btnGet}
                  onClick={getApi}
                  className="py-1 px-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-white"
                >
                  Get
                </button>
              )}
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
});

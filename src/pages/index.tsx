import MainEditor from '@components/Editor';
import Layout from '@components/Layout';
import { joinString } from '@ootiq/blank';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { filename, description, content } = router.query;

  return (
    <Layout title="Welcome ">
      <div className="w-5/6 mx-auto mt-8">
        <p className="tracking-wide text-primary-500 opacity-90 text-lg font-bold">Create A New Paste</p>
      </div>
      <MainEditor
        queryData={{
          filename: joinString(filename),
          description: joinString(description),
          content: joinString(content)
        }}
      />
    </Layout>
  );
}

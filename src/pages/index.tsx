import MainEditor from '@components/Editor';
import Layout from '@components/Layout';

export default function Home() {
  return (
    <Layout title="Welcome ">
      <div className="w-5/6 mx-auto mt-8">
        <p className="tracking-wide text-primary-500 text-lg">Create A New Paste</p>
      </div>
      <MainEditor />
    </Layout>
  );
}

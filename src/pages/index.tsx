import MainEditor from '@components/Editor';
import { Footer } from '@components/Footer';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';

export default function Home() {
  return (
    <Layout title="Welcome ">
      <Navigation />
      <hr />
      <MainEditor />
    </Layout>
  );
}

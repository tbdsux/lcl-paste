import Layout from './Layout';
import Navigation from './Nav';

type LoadingProps = { title: string };

export const Loading = ({ title }: LoadingProps) => {
  return (
    <Layout title={title}>
      <Navigation />

      <hr />

      <p>Loading...</p>
    </Layout>
  );
};

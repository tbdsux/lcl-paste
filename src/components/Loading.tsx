import Layout from './Layout';

type LoadingProps = { title: string };

export const Loading = ({ title }: LoadingProps) => {
  return (
    <Layout title={title}>
      <p>Loading...</p>
    </Layout>
  );
};

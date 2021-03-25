import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import useSWR from 'swr';

export default withPageAuthRequired(function UserPastes({ user }) {
  return (
    <Layout title="User Pastes">
      <Navigation />

      <hr />
    </Layout>
  );
});

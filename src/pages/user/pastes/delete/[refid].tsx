import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { useRouter } from 'next/router';

export default withPageAuthRequired(function DeletePaste() {
  const router = useRouter();
  const { refid } = router.query;

  if (refid) {
    fetch(`/api/pastes/delete/${refid}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        router.push('/user/pastes');
      } else {
        // there was an error during deletion
      }
    });
  }

  return null; // just a blank page
});

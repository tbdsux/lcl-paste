import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { useRouter } from 'next/router';
import { ApiDeletePasteResponse } from 'pages/api/pastes/delete/[refid]';
import { mutate } from 'swr';

export default withPageAuthRequired(function DeletePaste() {
  const router = useRouter();
  const { refid } = router.query;

  if (refid) {
    fetch(`/api/pastes/delete/${refid}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then((data: ApiDeletePasteResponse) => {
        if (!data.error) {
          mutate(`/api/pastes/latest`);
          mutate('/api/pastes/user');
          router.push('/user/pastes');
        } else {
          // there was an error during deletion
        }
      });
  }

  return null; // just a blank page
});

import useSWR from 'swr';

import { BlockPasteInfo } from '../Block';

import { PasteQueryResponse } from '@utils/interfaces/query';
import { ApiGetUserPastes } from 'pages/api/pastes/user';

export const RenderUserPastes = () => {
  const { data: pastes, error } = useSWR<ApiGetUserPastes>('/api/pastes/user');

  if (!pastes) {
    return <p className="mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="mt-6">There was a problem while trying to fetch your pastes.</p>;
  }

  return (
    <ul className="mt-6">
      {pastes.data?.map((paste: PasteQueryResponse, index) => (
        <section key={index}>
          <BlockPasteInfo paste={paste} isUserPage={true} /> <hr className="border-secondary-100 my-1" />
        </section>
      ))}
    </ul>
  );
};

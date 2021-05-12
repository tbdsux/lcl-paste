import useSWR from 'swr';

import { BlockPasteInfo } from '../Block';
import { PasteQueryResponse } from '@utils/interfaces/query';
import { ApiGetLatestResponse } from 'pages/api/pastes/latest';

export const RenderLatestPastes = () => {
  const { data: pastes, error } = useSWR<ApiGetLatestResponse>('/api/pastes/latest');

  if (!pastes) {
    return <p className="mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="mt-6">There was a problem while trying to fetch the latest pastes.</p>;
  }

  return (
    <ul className="mt-6">
      {pastes.data?.map((paste: PasteQueryResponse, index) => (
        <BlockPasteInfo key={index} paste={paste} isUserPage={false} />
      ))}
    </ul>
  );
};

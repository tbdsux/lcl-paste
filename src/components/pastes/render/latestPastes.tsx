import useSWR from 'swr';
import Link from 'next/link';

import { Info } from '@components/pastes/info';
import { Details } from '@components/pastes/details';

import { GetLatestPastesQuery, PasteQueryResponse } from '@utils/interfaces/query';
import { isNew } from '@lib/isNew';

type RenderLatestPastesProps = {
  initialPastes: GetLatestPastesQuery;
};

export const RenderLatestPastes = ({ initialPastes }: RenderLatestPastesProps) => {
  const { data: pastes, error } = useSWR<GetLatestPastesQuery>('/api/pastes/latest', { initialData: initialPastes });

  if (!pastes) {
    return <p className="mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="mt-6">There was a problem while trying to fetch the latest pastes.</p>;
  }

  return (
    <ul className="mt-6">
      {pastes.data?.map((paste: PasteQueryResponse, index) => (
        <li className="my-3" key={index}>
          <Link href={`/p/${paste.data.pasteId}`}>
            <a
              className="relative col-span-11 border border-secondary-300 py-3 px-6 flex flex-col md:flex-row items-start md:items-center justify-between rounded hover:border-primary-500"
              title="View paste"
            >
              {isNew(paste.data.createdDate) && (
                <span
                  title="Paste is newly created"
                  className="absolute -top-2 -left-2 bg-primary-500 text-white rounded-md p-1 text-xs"
                >
                  new
                </span>
              )}
              <Info filename={paste.data.filename} description={paste.data.description} />
              <div className="w-full md:w-1/2 mt-1 md:mt-0 justify-end inline-flex items-center text-secondary-500">
                <Details
                  username={paste.data.ownedByUsername}
                  createdDate={paste.data.createdDate}
                  updated={paste.data.updated}
                  isPrivate={paste.data.isPrivate}
                  updatedDate={paste.data.updatedDate}
                  isUserPage={false}
                />
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

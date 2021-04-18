import Link from 'next/link';
import { PasteQueryResponse } from '@utils/interfaces/query';

import { Info } from '@components/pastes/info';
import { Details } from '@components/pastes/details';
import { UserActions } from '@components/pastes/userActions';

type PasteBlockProps = { paste: PasteQueryResponse; isUserPage: boolean };

export const BlockPasteInfo = ({ paste, isUserPage }: PasteBlockProps) => {
  return (
    <li
      className={`my-2 grid gap-2 items-center ${isUserPage ? 'grid-cols-12' : 'grid-cols-1'}`}
      key={paste.data.pasteId}
    >
      <Link href={`/p/${paste.data.pasteId}`}>
        <a
          className="col-span-11 border border-secondary-200 py-3 px-6 flex items-center justify-between rounded hover:border-primary-500"
          title="View paste"
        >
          <Info filename={paste.data.filename} description={paste.data.description} />
          <div className="w-1/2 justify-end inline-flex items-center text-secondary-500">
            <Details
              username={paste.data.ownedByUsername}
              createdDate={paste.data.createdDate}
              updated={paste.data.updated}
              isPrivate={paste.data.isPrivate}
              updatedDate={paste.data.updatedDate}
              isUserPage={isUserPage}
            />
          </div>
        </a>
      </Link>
      {isUserPage ? (
        <div className="text-secondary-500 flex justify-center">
          <UserActions refid={paste.ref['@ref'].id} pasteid={paste.data.pasteId} />
        </div>
      ) : null}
    </li>
  );
};

import { useUser } from '@auth0/nextjs-auth0';
import { PasteUserData } from '@utils/interfaces/paste';

type PasteDetailsProps = {
  username: string;
  createdDate: string;
  isPrivate?: boolean;
  updated?: boolean;
  updatedDate?: string;
  isUserPage: boolean;
};

export const Details = ({ username, createdDate, isPrivate, updated, updatedDate, isUserPage }: PasteDetailsProps) => {
  const date = `[${updated ? `${new Date(updatedDate).toUTCString()}-updated` : new Date(createdDate).toUTCString()}]`;

  return (
    <>
      {isUserPage ? (
        <div className="mr-8">
          <span className="bg-secondary-400 text-xs p-1 text-white mx-1">{isPrivate ? 'private' : 'public'}</span>
          <span className="text-xs">{date}</span>
        </div>
      ) : (
        <span className="text-sm text-secondary-400 md:ml-8 inline-flex flex-col md:flex-row items-end md:items-center">
          @{username ? username : 'anonymous'} <span className="ml-1 text-xs text-secondary-300">{date}</span>
        </span>
      )}
    </>
  );
};

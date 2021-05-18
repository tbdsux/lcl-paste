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
        <div className="flex items-center justify-between">
          <span className="text-xs">{date}</span>
          <span className="bg-secondary-400 text-xs p-1 text-white ml-3">{isPrivate ? 'private' : 'public'}</span>
        </div>
      ) : (
        <span className="text-sm text-secondary-400 md:ml-8 inline-flex flex-col md:flex-row items-end md:items-center">
          @{username ? username : 'anonymous'} <span className="ml-1 text-xs text-secondary-300">{date}</span>
        </span>
      )}
    </>
  );
};

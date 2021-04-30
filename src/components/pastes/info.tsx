type PasteInfoProps = { filename: string; description: string };

export const Info = ({ filename, description }: PasteInfoProps) => {
  return (
    <div className="w-full md:w-1/2 justify-start inline-flex">
      <h4 className="truncate">
        {filename} <span className="text-secondary-500 text-sm">{description ? `(${description})` : null}</span>
      </h4>
    </div>
  );
};

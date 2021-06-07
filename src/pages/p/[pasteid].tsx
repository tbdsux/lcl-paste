import { GetServerSideProps } from 'next';

import useSWR from 'swr';

import { jsonify, joinString } from '@ootiq/blank';

import { GetPasteByIdQuery } from '@utils/interfaces/query';
import { GetPasteHandler } from '@functions/getPaste';
import { PasteContainer } from '@components/pastes/page';
import Layout from '@components/Layout';
import { CopyEmbed } from '@components/pastes/embed';
import { useRef } from 'react';

type ViewPasteProps = {
  pasteid: string;
  initialPaste: GetPasteByIdQuery;
};

export const getServerSideProps: GetServerSideProps<ViewPasteProps> = async ({ req, res, params }) => {
  const { pasteid } = params;

  const q = await GetPasteHandler(req, res, joinString(pasteid));

  return {
    props: {
      pasteid: joinString(pasteid),
      initialPaste: jsonify(q)
    }
  };
};

export default function ViewPaste({ pasteid, initialPaste }: ViewPasteProps) {
  // get response
  const { data: paste } = useSWR<GetPasteByIdQuery>(pasteid ? `/api/pastes/get/${pasteid}` : null, {
    initialData: initialPaste
  });

  const pasteContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Layout title={paste.error ? paste.description : paste.data.paste.filename}>
      <PasteContainer paste={paste} pasteContainerRef={pasteContainerRef} />

      {!paste.error && <CopyEmbed pasteid={pasteid} pasteContainerRef={pasteContainerRef} />}
    </Layout>
  );
}

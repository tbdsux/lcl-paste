import { ReactNode } from 'react';
import Head from 'next/head';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Local Paste</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="antialiased">
        {children}
        <Footer></Footer>
      </main>
    </>
  );
}

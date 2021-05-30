import { LinkButton, ExternalLinkButton } from './shared/link';

const Footer = () => {
  return (
    <footer className="py-8">
      <section className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="my-2 md:my-0">
            <h1 className="text-xl font-black tracking-wide text-secondary-800">
              Local <span className="text-primary-500">Paste</span>
            </h1>
            <p className="text-secondary-700 text-center text-sm">
              &copy; {new Date().getFullYear()} | All Rights Reserved
            </p>
            <ExternalLinkButton
              href="https://github.com/TheBoringDude"
              title="Phurma project"
              className="text-sm text-secondary-500 hover:underline"
            >
              @TheBoringDude
            </ExternalLinkButton>
          </div>

          <ul className="my-2 md:my-0">
            <li>
              <LinkButton href="/latest">Latest</LinkButton>
            </li>
          </ul>
          <ul className="my-2 md:my-0 text-sm">
            <li className="my-1">
              <ExternalLinkButton
                href="https://phurma.vercel.app"
                title="Phurma project"
                className="text-secondary-600"
              >
                phurma
              </ExternalLinkButton>
            </li>
            <li className="my-1">
              <ExternalLinkButton
                href="https://quaker.vercel.app"
                title="Quaker project"
                className="text-secondary-600"
              >
                quaker
              </ExternalLinkButton>
            </li>
            <li className="my-1">
              <ExternalLinkButton
                href="https://github.com/TheBoringDude/lcl-paste"
                title="Goto Github Repo"
                className="text-secondary-600"
              >
                github
              </ExternalLinkButton>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export { Footer };

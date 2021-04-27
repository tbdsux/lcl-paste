import { LinkButton, ExternalLinkButton } from './shared/link';

const Footer = () => {
  return (
    <footer className="py-8">
      <section className="w-11/12 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-wide text-secondary-800">Local Paste</h1>
            <p className="text-secondary-700 text-center text-sm">
              &copy; {new Date().getFullYear()} | All Rights Reserved
            </p>
          </div>

          <ul>
            <li>
              <LinkButton href="/latest">Latest</LinkButton>
            </li>
          </ul>
          <ul>
            <li>
              <ExternalLinkButton href="https://github.com/TheBoringDude/lcl-paste" title="Goto Github Repo">
                Github
              </ExternalLinkButton>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export { Footer };

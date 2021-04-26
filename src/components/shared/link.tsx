import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends LinkProps {}
interface ExternalLinkButtonProps extends LinkProps {}

const LinkButton = ({ href, className, children }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <a className={`${className} text-secondary-800 hover:text-primary-500`}>{children}</a>
    </Link>
  );
};

const ExternalLinkButton = ({ href, className, children }: ExternalLinkButtonProps) => {
  return (
    <a href={href} className={`${className} text-secondary-800 hover:text-primary-500`} target="_blank">
      {children}
    </a>
  );
};

export { LinkButton, ExternalLinkButton };

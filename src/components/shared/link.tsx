import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends LinkProps {}
interface ExternalLinkButtonProps extends AnchorHTMLAttributes<LinkProps> {}

const LinkButton = ({ href, className, children }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <a className={`${className} text-secondary-800 hover:text-primary-500`} title={children.toString()}>
        {children}
      </a>
    </Link>
  );
};

const ExternalLinkButton = ({ href, className, children, title }: ExternalLinkButtonProps) => {
  return (
    <a href={href} title={title} className={`${className} text-secondary-800 hover:text-primary-500`} target="_blank">
      {children}
    </a>
  );
};

export { LinkButton, ExternalLinkButton };

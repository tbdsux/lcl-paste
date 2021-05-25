import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

const LinkButton = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link href={props.href}>
      <a
        id={props.id}
        className={`${props.className} text-secondary-800 hover:text-primary-500`}
        title={props.children.toString()}
      >
        {props.children}
      </a>
    </Link>
  );
};

const ExternalLinkButton = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      href={props.href}
      title={props.title}
      className={`${props.className} text-secondary-800 hover:text-primary-500`}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
};

export { LinkButton, ExternalLinkButton };

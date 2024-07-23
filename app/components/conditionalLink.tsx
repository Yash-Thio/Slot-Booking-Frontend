import { LinkProps } from 'next/link';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ConditionalLinkProps extends LinkProps {
  children: ReactNode;
  condition: boolean;
}

const ConditionalLink: React.FC<ConditionalLinkProps> = ({ children, href, condition, ...props }) => {
  return condition ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default ConditionalLink;

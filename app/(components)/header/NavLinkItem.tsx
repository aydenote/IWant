import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: ReactNode;
}

export function NavLinkItem({ children, ...props }: NavLinkItemProps) {
  return (
    <Link
      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

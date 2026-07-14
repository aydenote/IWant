import type { ReactNode } from 'react';

interface RepoGridProps {
  children: ReactNode;
  className?: string;
}

const RepoGrid = ({ children, className = '' }: RepoGridProps) => (
  <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {children}
  </div>
);

export default RepoGrid;

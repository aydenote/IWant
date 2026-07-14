import type { ReactNode } from 'react';

interface RepoStatProps {
  children: ReactNode;
  icon: ReactNode;
}

const RepoStat = ({ children, icon }: RepoStatProps) => (
  <div className="flex items-center gap-1">
    {icon}
    <span>{children}</span>
  </div>
);

export default RepoStat;

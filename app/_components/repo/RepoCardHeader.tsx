import Link from 'next/link';
import type { ReactNode } from 'react';
import BuildingIcon from '../icons/BuildingIcon';

interface RepoCardHeaderProps {
  bookmarkSlot: ReactNode;
  ownerName: string;
  repoHref: string;
  repoName: string;
}

const RepoCardHeader = ({
  bookmarkSlot,
  ownerName,
  repoHref,
  repoName,
}: RepoCardHeaderProps) => (
  <div className="flex items-start justify-between gap-3">
    <div className="space-y-2 flex-1">
      <Link href={repoHref}>
        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
          {repoName}
        </h3>
      </Link>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BuildingIcon className="h-4 w-4" />
        <span className="font-medium">{ownerName}</span>
      </div>
    </div>
    <div className="flex h-10 w-14 shrink-0 justify-end">{bookmarkSlot}</div>
  </div>
);

export default RepoCardHeader;

'use client';

import Text from '../../../_components/commons/Text';
import BuildingIcon from '../../../_components/icons/BuildingIcon';
import MapPinIcon from '../../../_components/icons/MapPinIcon';
import UsersIcon from '../../../_components/icons/UsersIcon';
import { RepoDetailResponse } from '../../../_types/repo';
import { useRepoSummaryCard } from '../_hooks/useRepoSummaryCard';
import RepoStat from '../../../_components/repo/RepoStat';

const RepoSummaryCard = ({ repo }: { repo: RepoDetailResponse }) => {
  const {
    description,
    formattedOpenIssues,
    formattedStars,
    fullName,
    messages,
    ownerName,
  } = useRepoSummaryCard(repo);

  return (
    <div className="space-y-4 pb-6 border-b">
      <Text as="h1" textSize="3xl" textBold="xl" textColor="black">
        {fullName}
      </Text>
      <div className="flex items-center gap-2 text-lg text-foreground">
        <BuildingIcon className="h-5 w-5" />
        <span className="font-medium">{ownerName}</span>
      </div>
      {description && (
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <RepoStat icon={<MapPinIcon className="h-4 w-4" />}>
          {formattedStars} {messages.repoCard.stars}
        </RepoStat>
        <RepoStat icon={<UsersIcon className="h-4 w-4" />}>
          {formattedOpenIssues} {messages.repoCard.openIssues}
        </RepoStat>
      </div>
    </div>
  );
};

export default RepoSummaryCard;

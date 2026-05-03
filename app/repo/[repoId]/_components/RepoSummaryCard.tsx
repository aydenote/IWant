import Text from '../../../_components/commons/Text';
import BuildingIcon from '../../../_components/icons/BuildingIcon';
import MapPinIcon from '../../../_components/icons/MapPinIcon';
import UsersIcon from '../../../_components/icons/UsersIcon';
import { RepoDetailResponse } from '../../../_types/apis';

const RepoSummaryCard = ({ repo }: { repo: RepoDetailResponse }) => (
  <div className="space-y-4 pb-6 border-b">
    <Text as="h1" textSize="3xl" textBold="xl" textColor="black">
      {repo.fullName}
    </Text>
    <div className="flex items-center gap-2 text-lg text-foreground">
      <BuildingIcon className="h-5 w-5" />
      <span className="font-medium">{repo.owner.login}</span>
    </div>
    {repo.description && (
      <p className="text-sm leading-6 text-muted-foreground">
        {repo.description}
      </p>
    )}
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <MapPinIcon className="h-4 w-4" />
        <span>{repo.stars.toLocaleString()} stars</span>
      </div>
      <div className="flex items-center gap-1">
        <UsersIcon className="h-4 w-4" />
        <span>{repo.openIssues.toLocaleString()} open issues</span>
      </div>
    </div>
  </div>
);

export default RepoSummaryCard;

import Text from '../../(components)/commons/Text';
import BuildingIcon from '../../(components)/icons/BuildingIcon';
import MapPinIcon from '../../(components)/icons/MapPinIcon';
import UsersIcon from '../../(components)/icons/UsersIcon';
import { JobDetailResponse } from '../../(types)/apis';

const JobSummaryCard = ({ job }: { job: JobDetailResponse }) => (
  <div className="space-y-4 pb-6 border-b">
    <Text as="h1" textSize="3xl" textBold="xl" textColor="black">
      {job.detail.position}
    </Text>
    <div className="flex items-center gap-2 text-lg text-foreground">
      <BuildingIcon className="h-5 w-5" />
      <span className="font-medium">{job.company.name}</span>
    </div>
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <MapPinIcon className="h-4 w-4" />
        <span>{job.address.location + ' ' + job.address.district}</span>
      </div>
      <div className="flex items-center gap-1">
        <UsersIcon className="h-4 w-4" />
        <span>{job.employment_type === 'intern' ? '인턴' : '정직원'}</span>
      </div>
    </div>
  </div>
);

export default JobSummaryCard;

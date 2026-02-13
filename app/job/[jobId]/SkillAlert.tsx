import AlertBox from './AlertBox';
import Pill from '../../(components)/Pill';

interface SkillAlertProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  type: 'success' | 'accent' | 'warning';
  emptyMessage: string;
}

const SkillAlert = ({
  title,
  icon,
  skills = [],
  type,
  emptyMessage,
}: SkillAlertProps) => (
  <AlertBox icon={icon} title={title} type={type}>
    {skills.length === 0 ? (
      <div className="text-sm text-muted-foreground">{emptyMessage}</div>
    ) : (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Pill key={skill} className="text-xs px-2.5 py-0.5">
            {skill}
          </Pill>
        ))}
      </div>
    )}
  </AlertBox>
);

export default SkillAlert;

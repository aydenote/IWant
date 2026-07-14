import BasicButton from '../../_components/buttons/BasicButton';
import Pill from '../../_components/commons/Pill';
import Text from '../../_components/commons/Text';
import Input from '../../_components/forms/Input';
import CloseIcon from '../../_components/icons/CloseIcon';
import PlusIcon from '../../_components/icons/PlusIcon';

interface TechStackEditorProps {
  newSkill: string;
  onAddSkill: () => void;
  onNewSkillChange: (value: string) => void;
  onRemoveSkill: (skill: string) => void;
  techStack: string[];
}

const TechStackEditor = ({
  newSkill,
  onAddSkill,
  onNewSkillChange,
  onRemoveSkill,
  techStack,
}: TechStackEditorProps) => (
  <div className="space-y-4 pt-6 border-t border-border">
    <Text as="h2" textSize="lg" textBold="lg" textColor="black">
      기술 스택
    </Text>

    <div className="flex gap-2">
      <Input
        value={newSkill}
        onChange={(event) => onNewSkillChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onAddSkill();
          }
        }}
        placeholder="기술 스택 추가 (예: React, Python)"
      />
      <BasicButton
        variant="default"
        onClick={onAddSkill}
        className="gap-2 cursor-pointer"
      >
        <PlusIcon className="h-4 w-4" />
        추가
      </BasicButton>
    </div>

    <div className="flex flex-wrap gap-2 min-h-15 p-4 bg-muted/50 rounded-lg border border-border">
      {techStack.length === 0 ? (
        <Text textSize="sm" textColor="bluegray500">
          보유한 기술 스택을 추가해주세요
        </Text>
      ) : (
        techStack.map((skill) => (
          <Pill key={skill} className="text-sm py-1.5 px-3 gap-2">
            {skill}
            <BasicButton
              onClick={() => onRemoveSkill(skill)}
              className="hover:text-destructive"
            >
              <CloseIcon className="h-3 w-3 cursor-pointer" />
            </BasicButton>
          </Pill>
        ))
      )}
    </div>
  </div>
);

export default TechStackEditor;

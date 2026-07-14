import Text from '../../_components/commons/Text';
import Input from '../../_components/forms/Input';
import Label from '../../_components/forms/Label';

interface ProfileBasicInfoProps {
  name: string;
  onNameChange: (value: string) => void;
}

const ProfileBasicInfo = ({ name, onNameChange }: ProfileBasicInfoProps) => (
  <div className="space-y-4">
    <Text as="h2" textSize="lg" textBold="lg" textColor="black">
      기본 정보
    </Text>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
    </div>
  </div>
);

export default ProfileBasicInfo;

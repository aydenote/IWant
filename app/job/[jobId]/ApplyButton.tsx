import Link from 'next/link';
import BasicButton from '../../(components)/buttons/BasicButton';

interface ApplyButtonProps {
  jobId: number;
}

const ApplyButton = ({ jobId }: ApplyButtonProps) => (
  <Link href={`https://www.wanted.co.kr/wd/${jobId}`} target="_blank">
    <BasicButton className="w-full bg-gradient-hero text-lg h-12 text-primary-foreground hover:bg-primary/90">
      지원하러 가기
    </BasicButton>
  </Link>
);

export default ApplyButton;

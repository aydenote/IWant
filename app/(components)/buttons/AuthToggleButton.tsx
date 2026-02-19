import { signIn, signOut } from 'next-auth/react';
import UsersIcon from '../icons/UsersIcon';
import BasicButton from './BasicButton';

interface AuthToggleButtonProps {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  className?: string;
}

const AuthToggleButton = ({
  status,
  className = '',
}: AuthToggleButtonProps) => {
  const isAuthed = status === 'authenticated';

  return (
    <BasicButton
      onClick={() =>
        isAuthed ? signOut({ callbackUrl: '/' }) : signIn('kakao')
      }
      variant="outline"
      size="sm"
      className={`gap-2 ${className}`}
    >
      <UsersIcon className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isAuthed ? '로그아웃' : '카카오 로그인'}
      </span>
    </BasicButton>
  );
};

export default AuthToggleButton;

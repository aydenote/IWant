import type { ButtonHTMLAttributes, ReactNode } from 'react';
import BasicButton from './BasicButton';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const TabButton = ({
  isActive = false,
  className = '',
  children,
  ...props
}: TabButtonProps) => {
  const stateClass = isActive
    ? 'bg-secondary-foreground text-white text-foreground shadow-sm'
    : 'text-muted-foreground';

  return (
    <BasicButton
      variant="ghost"
      aria-selected={isActive}
      className={`cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${stateClass} ${className}`}
      {...props}
    >
      {children}
    </BasicButton>
  );
};

export default TabButton;

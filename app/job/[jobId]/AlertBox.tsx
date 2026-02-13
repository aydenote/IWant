import type { ReactNode } from 'react';

interface AlertBoxProps {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  type?: 'success' | 'accent' | 'warning';
}

const AlertBox = ({
  icon,
  title,
  children,
  type = 'success',
}: AlertBoxProps) => {
  const typeClasses = {
    success: 'border-success text-success bg-success/10',
    warning: 'border-warning text-warning bg-warning/10',
    accent: 'border-accent text-accent bg-accent/10',
  };
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 text-sm ${typeClasses[type]}`}
    >
      <div className="absolute left-4 top-4">{icon}</div>
      <div className="ml-7">
        <strong className="block text-base font-semibold">{title}</strong>
        <div className="mt-2 space-y-2">{children}</div>
      </div>
    </div>
  );
};

export default AlertBox;

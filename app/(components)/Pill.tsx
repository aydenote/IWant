import React from 'react';

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {}

const Pill = ({ className = '', ...props }: PillProps) => {
  const baseClasses =
    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' +
    'items-center rounded-full border px-2.5 py-0.5 text-xs';

  return <div className={`${baseClasses} ${className}`} {...props} />;
};

export default Pill;

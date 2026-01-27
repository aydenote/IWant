import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = '', ...props }: InputProps) => {
  const baseClasses =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base' +
    'placeholder:text-muted-foreground' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return <input className={`${baseClasses} ${className}`} {...props} />;
};

export default Input;

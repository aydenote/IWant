import React, { ReactNode } from 'react';
import { TEXT_BOLD, TEXT_COLOR, TEXT_SIZE } from '../constants/TextStyles';

interface TextProps<T extends React.ElementType> {
  textColor?: keyof typeof TEXT_COLOR;
  textBold?: keyof typeof TEXT_BOLD;
  textSize?: keyof typeof TEXT_SIZE;
  as?: T;
  className?: string;
  children: ReactNode;
}

const Text = <T extends React.ElementType = 'p'>({
  textColor,
  textBold,
  textSize,
  as,
  className = '',
  children,
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'p';
  const baseClass = [
    textColor && TEXT_COLOR[textColor],
    textBold && TEXT_BOLD[textBold],
    textSize && TEXT_SIZE[textSize],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={baseClass} {...props}>
      {children}
    </Component>
  );
};

export default Text;

import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';
type SurfaceShadow = 'none' | 'sm' | 'card' | 'lg';
type SurfaceVariant = 'card' | 'gradient';

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  padding?: SurfacePadding;
  shadow?: SurfaceShadow;
  variant?: SurfaceVariant;
}

const paddingClasses: Record<SurfacePadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const shadowClasses: Record<SurfaceShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  card: 'shadow-card',
  lg: 'shadow-lg',
};

const variantClasses: Record<SurfaceVariant, string> = {
  card: 'bg-card',
  gradient: 'bg-gradient-card',
};

const Surface = ({
  as: Component = 'div',
  children,
  className = '',
  padding = 'md',
  shadow = 'card',
  variant = 'gradient',
  ...props
}: SurfaceProps) => (
  <Component
    className={`rounded-lg border text-card-foreground ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}
    {...props}
  >
    {children}
  </Component>
);

export default Surface;

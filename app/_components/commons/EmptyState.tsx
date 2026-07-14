interface EmptyStateProps {
  className?: string;
  message: string;
}

const EmptyState = ({ className = '', message }: EmptyStateProps) => (
  <div className={`py-16 text-center text-muted-foreground ${className}`}>
    {message}
  </div>
);

export default EmptyState;

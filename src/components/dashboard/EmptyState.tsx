import { cn } from '../../lib/utils';

interface EmptyStateProps {
  type: 'available' | 'upcoming' | 'historic';
  className?: string;
}

const emptyStateConfig = {
  available: {
    icon: '📭',
    title: 'No classes available right now',
    description: 'Check back later for new opportunities',
  },
  upcoming: {
    icon: '🎉',
    title: "You're all caught up!",
    description: 'No upcoming lessons scheduled',
  },
  historic: {
    icon: '📚',
    title: 'No lesson history yet',
    description: 'Complete your first class to see it here',
  }
};

export function EmptyState({ type, className }: EmptyStateProps) {
  const config = emptyStateConfig[type];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      "animate-in fade-in duration-500",
      className
    )}>
      <div className="text-5xl mb-4">{config.icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {config.description}
      </p>
    </div>
  );
}

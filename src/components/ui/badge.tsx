import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none',
  {
    variants: {
      variant: {
        default: 'bg-foreground/5 text-foreground',
        ghost: 'bg-transparent text-muted hover:bg-foreground/5',
        accent: 'border-accent/60 bg-accent/15 text-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'ghost' | 'accent';
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'span';
    return (
      <Component
        ref={ref as never}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

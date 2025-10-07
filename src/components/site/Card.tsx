import * as React from 'react';
import {
  Card as UICard,
  CardContent as UICardContent,
  CardDescription as UICardDescription,
  CardFooter as UICardFooter,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
} from '../ui/card';
import { cn } from '~/lib/utils';

export interface CardProps extends React.ComponentProps<typeof UICard> {
  highlight?: boolean;
}

export function Card({ highlight = false, className, ...props }: CardProps) {
  return (
    <UICard
      className={cn(
        'relative overflow-hidden',
        highlight &&
          'border-accent/70 bg-gradient-to-br from-accent/20 via-card/85 to-secondary/25 shadow-floating-lg',
        className,
      )}
      {...props}
    />
  );
}

export const CardHeader = UICardHeader;
export const CardTitle = UICardTitle;
export const CardDescription = UICardDescription;
export const CardContent = UICardContent;
export const CardFooter = UICardFooter;

import * as React from 'react';
import { badgeVariants } from '../ui/badge';
import { cn } from '~/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    active?: boolean;
};

type SpanProps = React.HTMLAttributes<HTMLSpanElement> & {
    as?: 'span';
    active?: boolean;
};

export type TagProps = ButtonProps | SpanProps;

export const Tag = React.forwardRef<HTMLElement, TagProps>(
    ({ active = false, as = 'span', className, children, ...rest }, ref) => {
        if (as === 'button') {
            const buttonProps = rest as ButtonProps;
            return (
                <button
                    {...buttonProps}
                    ref={ref as React.Ref<HTMLButtonElement>}
                    type={buttonProps.type ?? 'button'}
                    className={cn(
                        badgeVariants({ variant: active ? 'accent' : 'default' }),
                        'cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        className,
                    )}
                >
                    {children}
                </button>
            );
        }

        const spanProps = rest as SpanProps;
        return (
            <span
                {...spanProps}
                ref={ref as React.Ref<HTMLSpanElement>}
                className={cn(
                    badgeVariants({ variant: active ? 'accent' : 'default' }),
                    'cursor-default transition-colors',
                    className,
                )}
            >
                {children}
            </span>
        );
    },
);
Tag.displayName = 'Tag';

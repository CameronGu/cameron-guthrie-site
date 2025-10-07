import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
		'./src/content/**/*.mdx',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-bg)',
				foreground: 'var(--color-fg)',
				card: 'var(--color-card)',
				'card-foreground': 'var(--color-card-fg)',
				popover: 'var(--color-popover)',
				'popover-foreground': 'var(--color-popover-fg)',
				primary: 'var(--color-primary)',
				'primary-foreground': 'var(--color-primary-fg)',
				secondary: 'var(--color-secondary)',
				'secondary-foreground': 'var(--color-secondary-fg)',
				muted: 'var(--color-muted)',
				'muted-foreground': 'var(--color-muted-fg)',
				accent: 'var(--color-accent)',
				'accent-foreground': 'var(--color-accent-fg)',
				destructive: 'var(--color-destructive)',
				'destructive-foreground': 'var(--color-destructive-fg)',
				border: 'var(--color-border)',
				input: 'var(--color-input)',
				ring: 'var(--ring)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
				display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
			},
			borderRadius: {
				lg: 'var(--radius-base)',
				md: 'calc(var(--radius-base) * 0.75)',
				sm: 'calc(var(--radius-base) * 0.5)',
			},
			boxShadow: {
				'floating-lg':
					'0 30px 60px -15px color-mix(in srgb, var(--color-accent) 25%, transparent)',
			},
		},
	},
} satisfies Config;

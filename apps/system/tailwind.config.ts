import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#d4f1e3',
					100: '#b7e8d1',
					200: '#93ddba',
					300: '#6fd1a2',
					400: '#4bc68b',
					500: '#219b61',
					600: '#1a7c4d',
					700: '#145d3a',
					800: '#0d3e27',
					900: '#082517',
					base: '#27ba74'
				}
			}
		}
	},

	plugins: [typography]
} satisfies Config;

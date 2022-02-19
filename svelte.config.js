import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			server: {
				host: '0.0.0.0',
				port: 3000
			}
		}
	}
};

export default config;

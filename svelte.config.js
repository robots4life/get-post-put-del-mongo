/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		// target: '#svelte',
		vite: {
			server: {
				host: '0.0.0.0',
				port: 3000
			}
		}
	}
};

export default config;

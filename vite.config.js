import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), imagetools()],
	assetsInclude: ['**/*.glb'],
	optimizeDeps: {
		include: ['bad-words', 'french-badwords-list']
	}
});

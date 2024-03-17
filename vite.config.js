import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    assetsInclude: ['**/*.glb'],
    optimizeDeps: {
        include: ['page-flip', 'bad-words', 'french-badwords-list']
	}
});

import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), imagetools()],
    optimizeDeps: {
        include: ["page-flip"]
    }
});

import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit//vite';

// import adapter from '@sveltejs/adapter-netlify';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), preprocess({
		postcss: true
})],
  kit: {
    adapter: adapter({
      edge: true
    })
  }
};

export default config;
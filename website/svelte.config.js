import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $com: 'src/com',
      $utils: 'src/utils'
    },
    browser: {
      router: true
    }
  },
  preprocess: [
    preprocess({
    })
  ]
};

export default config;

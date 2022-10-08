import { sveltekit } from '@sveltejs/kit/vite';
import WindiCSS from 'vite-plugin-windicss'

const config = {
  plugins: [
    sveltekit(),
    WindiCSS({
      scan: {
        dirs: ['./src'],
        fileExtensions: ['svelte', 'md', 'js', 'ts'],
      }
    })
  ]
};

export default config;

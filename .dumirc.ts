import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  alias: {
    '@rc-component/slider$': path.resolve('src'),
    '@rc-component/slider/es': path.resolve('src'),
  },
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Rate',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
});

import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  alias: {
    'rc-rate$': path.resolve('src'),
    'rc-rate/es': path.resolve('src'),
  },
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Rate',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
});

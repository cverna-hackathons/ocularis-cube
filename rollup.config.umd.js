import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/ocularis-cube.umd.js';
config.moduleName = 'OcularisCube';

export default config;

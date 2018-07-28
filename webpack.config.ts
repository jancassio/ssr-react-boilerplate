import path from 'path';
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

const DEBUG = process.env.DEBUG === 'true';
const ANALYZE = process.env.ANALYZE === 'true';
const VERBOSE = process.env.VERBOSE === 'true';

const config: Configuration = {
  mode: DEBUG ? 'development' : 'production',
  name: 'config',

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', 'src'],
  },

  bail: !DEBUG,
  cache: DEBUG,
  stats: {
    cached: VERBOSE,
    cachedAssets: VERBOSE,
    chunkModules: VERBOSE,
    chunks: VERBOSE,
    colors: true,
    errorDetails: true,
    errors: true,
    hash: VERBOSE,
    performance: true,
    publicPath: true,
    reasons: true,
    timings: false,
    version: VERBOSE,
  },
};

const client: Configuration = {
  ...config,

  name: 'client',
  target: 'web',

  entry: {
    client: [
      ...(DEBUG ? [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
      ] : []),
      '@babel/polyfill',
      './src/client/client.tsx',
    ],
  },

  output: {
    ...config.output,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
  },

  plugins: [
    ...(DEBUG ? [ new HotModuleReplacementPlugin() ] : []),
    new DefinePlugin({
      '__CLIENT__': true,
      '__DEV__': DEBUG,
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    }),
  ],
};

const server: Configuration = {
  ...config,

  name: 'server',
  target: 'node',

  entry: {
    server: './src/index.ts',
  },

  output: {
    ...config.output,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  externals: [ nodeExternals() ],

  plugins: [
    new DefinePlugin({
      '__DEV__': DEBUG,
      '__SERVER__': true,
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    }),
    ...(ANALYZE ? [ new BundleAnalyzerPlugin() ] : []),
  ],

  devtool: DEBUG ? 'cheap-module-source-map' : false,
};

export default [ client, server ];

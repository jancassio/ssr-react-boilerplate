import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

const isDevelopment = !process.argv.includes('--release');
const isAnalyze = process.argv.includes('--analyze');
const isVerbose = process.argv.includes('--verbose');

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
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

  bail: !isDevelopment,
  cache: isDevelopment,
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunkModules: isVerbose,
    chunks: isVerbose,
    colors: true,
    errorDetails: true,
    errors: true,
    hash: isVerbose,
    performance: true,
    publicPath: true,
    reasons: true,
    timings: false,
    version: isVerbose,
  },
};

const client: Configuration = {
  ...config,

  name: 'client',
  target: 'web',

  entry: {
    client: [
      'webpack-hot-middleware/client',
      './src/client/client.tsx',
    ],
  },

  output: {
    ...config.output,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
  },

  plugins: [
    new HotModuleReplacementPlugin(),
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
    ...(isAnalyze ? [ new BundleAnalyzerPlugin() ] : []),
  ],

  devtool: isDevelopment ? 'cheap-module-source-map' : false,
};

export default [ client, server ];

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },

  basePath: isProd ? '/rana-travels' : '',
  assetPrefix: isProd ? '/rana-travels/' : '',
};

module.exports = nextConfig;
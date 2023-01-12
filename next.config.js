const nextBuildId = require('next-build-id')

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `upgrade-insecure-requests; default-src 'self';`
  }
]

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}
const withSentryConfig = (otherConfig) =>
  require('@sentry/nextjs').withSentryConfig(otherConfig, sentryWebpackPluginOptions)

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withGlobalCssConfig = require('next-global-css').withGlobalCss()

const moduleExports = {
  trailingSlash: true,

  productionBrowserSourceMaps: false,
  // hmr: false,

  generateBuildId: () => nextBuildId({ dir: __dirname }),

  /** @see https://nextjs.org/docs/advanced-features/i18n-routing */
  i18n: {
    // locales: ['en-US', 'zh-CN'],
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  async redirects() {
    return [
      {
        source: '/liquidity',
        destination: '/liquidity/add',
        permanent: true
      },
      {
        source: '/acceleRaytor',
        destination: '/acceleraytor',
        permanent: false
      },
      {
        source: '/create',
        destination: '/create-position',
        permanent: false
      }
    ]
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  publicRuntimeConfig: {
    TRADE_API_HTTP: process.env.TRADE_API_HTTP,
    TRADE_API_AUTH_HEADER: process.env.TRADE_API_AUTH_HEADER
  }
}

module.exports = withBundleAnalyzer(withGlobalCssConfig(withSentryConfig(moduleExports)))

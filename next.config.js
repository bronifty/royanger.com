const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer()({
   images: {
      domains: ['i.scdn.co', 'pbs.twimg.com'],
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ['@svgr/webpack'],
      })

      return config
   },
})

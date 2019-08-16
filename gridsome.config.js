// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'jradtilbrook.dev',
  siteDescription: "jradtilbrook's personal website and blog.",
  siteUrl: 'https://jradtilbrook.dev',

  plugins: [],
  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.push(require('tailwindcss')())
        return options
      })
  },
}

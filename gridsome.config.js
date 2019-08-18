module.exports = {
  siteName: 'jradtilbrook.dev',
  siteDescription: "jradtilbrook's personal website and blog.",
  siteUrl: 'https://jradtilbrook.dev',

  plugins: [
    {
      // create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'blog/*.md',
        route: '/blog/:year/:month/:day/:slug',
        remark: {
          externalLinksTarget: '_self',
          plugins: [
            '@gridsome/remark-prismjs',
          ],
        },
      },
    },
  ],
  // run postcss with the tailwind plugin
  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.push(require('tailwindcss')())
        options.plugins.push(require('postcss-nested')())
        return options
      })
  },
}

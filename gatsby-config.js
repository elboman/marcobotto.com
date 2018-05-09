const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'marcobotto.com',
    author: 'Marco Botto',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-71636045-1',
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/_posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-source-instance',
          'gatsby-remark-use-jsx',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              linkImagesToOriginal: false,
              sizeByPixelDensity: false,
              quality: 100,
            },
          },
          {
            resolve: 'gatsby-remark-embedded-codesandbox',
            options: {
              directory: path.resolve(__dirname, 'src', '_examples'),
              getIframe: url =>
                `<div class="embedded-codesandbox"><iframe src="${url}" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe></div>`,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
  ],
};

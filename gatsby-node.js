const path = require('path');

exports.modifyWebpackConfig = function({ config, env }) {
  config._config.resolve.alias = {
    '@components': path.resolve('src/components/'),
    '@features': path.resolve('src/features/'),
    '@utils': path.resolve('src/utils/'),
    '@pages': path.resolve('src/pages/'),
    '@assets': path.resolve('src/assets/'),
  };
  return config;
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators;

  // setup redirects
  const legacyBlogUrls = [
    '/compiling-and-bundling-typescript-libraries-with-webpack/',
    '/overview-of-ui-router-react-and-comparison-with-react-router/',
    '/frontend-javascript-single-page-application-architecture/',
    '/the-hitchhikers-guide-to-the-modern-front-end-development-workflow/',
  ];

  legacyBlogUrls.forEach(url => {
    const to = `/blog${url}`;
    createRedirect({
      fromPath: url,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: to,
    });
  });

  // temporary redirects
  const temporaryRedirects = {
    '/': '/blog',
  };

  Object.keys(temporaryRedirects).forEach(fromPath => {
    const toPath = temporaryRedirects[fromPath];
    createRedirect({
      fromPath,
      toPath,
      redirectInBrowser: true,
      isPermanent: false,
    });
  });

  // create pages
  const PostTemplate = path.resolve('src/templates/post.js');

  const query = graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              slug
              title
            }
            fields {
              sourceInstanceName
            }
          }
        }
      }
    }
  `);

  return query.then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // filter by source instance name
    const posts = result.data.allMarkdownRemark.edges.filter(
      single => single.node.fields.sourceInstanceName === 'blog'
    );

    posts.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.frontmatter.slug}`,
        component: PostTemplate,
        context: {
          slug: node.frontmatter.slug,
        },
      });
    });
  });
};

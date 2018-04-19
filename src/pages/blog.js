import React from 'react';
import Link from 'gatsby-link';
import { format } from 'date-fns';

import { PageWrapper, PageContent, Button } from '@components';
import { Menu, Footer } from '@features';

import '@utils/globalStyles';

export default ({ data }) => {
  const { allMarkdownRemark: { edges } } = data;
  const posts = edges.map(single => single.node);
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        {posts.map(({ frontmatter }) => (
          <div key={frontmatter.slug}>
            <div>{format(new Date(frontmatter.date), 'DD/MM/YY')}</div>
            <Link to={`/blog/${frontmatter.slug}/`}>
              <span>{frontmatter.title}</span>
            </Link>
          </div>
        ))}
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            date
            slug
            title
          }
        }
      }
    }
  }
`;

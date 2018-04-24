import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';
import { format } from 'date-fns';

import { PageWrapper, PageContent, Button } from '@components';
import { Menu, Footer } from '@features';

import '@utils/globalStyles';

const _Posts = styled.section`
  display: grid;
  grid-gap: 2rem;
  grid-auto-rows: minmax(100%, 100%);
`;

const _Date = styled.div`
  font-weight: 700;
`;

const _Title = styled.span`
  font-size: 1.5rem;
`;

export default ({ data }) => {
  const { allMarkdownRemark: { edges } } = data;
  const posts = edges.map(single => single.node);
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <_Posts>
          {posts.map(({ frontmatter }) => (
            <article key={frontmatter.slug}>
              <_Date>{format(new Date(frontmatter.date), 'MM.DD.YY')}</_Date>
              <Link to={`/blog/${frontmatter.slug}/`}>
                <_Title>{frontmatter.title}</_Title>
              </Link>
            </article>
          ))}
        </_Posts>
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

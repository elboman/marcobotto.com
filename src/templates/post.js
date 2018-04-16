import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import DisqusThread from 'react-disqus-thread';

const _BlogTitle = styled.h1`
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 2rem;
`;

import { PageWrapper, PageContent, Metadata } from '@components';
import { Menu, Footer } from '@features';

export default function PostTemplate({ data, ...props }) {
  const { markdownRemark: post } = data;
  const title = post.frontmatter.title;
  const relativeUrl = props.location.pathname;
  const pageUrl = `https://marcobotto.com${relativeUrl}`;
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <Metadata title={title} description={post.excerpt} url={relativeUrl} />
        <_BlogTitle>{post.frontmatter.title}</_BlogTitle>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <DisqusThread
          shortname="marcobotto"
          identifier={`/${post.frontmatter.slug}/`}
          title={title}
          url={pageUrl}
        />
      </PageContent>
      <Footer />
    </PageWrapper>
  );
}

export const pageQuery = graphql`
  query SinglePostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

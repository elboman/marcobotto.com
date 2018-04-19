import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { css } from 'emotion';
import DisqusThread from 'react-disqus-thread';

import { mq } from '@utils';

import {
  PageWrapper,
  PageContent,
  Metadata,
  CommentSection,
} from '@components';

import { Menu, Footer } from '@features';

const _BlogTitle = styled.h1`
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 2rem;
`;

const _CommentsWrapper = styled(PageWrapper)`
  padding: 0 !important;
`;

const _CommentsContent = styled(PageContent)`
  padding: 1rem;
  ${mq.large(css`
    padding: 1rem 0 0;
  `)};
`;

export default function PostTemplate({ data, ...props }) {
  const { markdownRemark: post } = data;
  const title = post.frontmatter.title;
  const relativeUrl = props.location.pathname;
  const pageUrl = `https://marcobotto.com${relativeUrl}`;
  return (
    <div>
      <PageWrapper>
        <Menu />
        <PageContent>
          <Metadata
            title={title}
            description={post.excerpt}
            url={relativeUrl}
          />
          <_BlogTitle>{post.frontmatter.title}</_BlogTitle>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </PageContent>
      </PageWrapper>
      <CommentSection>
        <_CommentsWrapper>
          <_CommentsContent>
            <DisqusThread
              shortname="marcobotto"
              identifier={`/${post.frontmatter.slug}/`}
              title={title}
              url={pageUrl}
            />
          </_CommentsContent>
        </_CommentsWrapper>
      </CommentSection>
      <PageWrapper>
        <PageContent>
          <Footer />
        </PageContent>
      </PageWrapper>
    </div>
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

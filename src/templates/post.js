import React from 'react';
import Helmet from 'react-helmet';

import { Metadata } from '@components';

export default function PostTemplate({ data, ...props }) {
  const { markdownRemark: post } = data;
  const title = post.frontmatter.title;
  const pageUrl = props.location.pathname;
  return (
    <div>
      <Metadata title={title} description={post.excerpt} url={pageUrl} />
      <h1>{post.frontmatter.title}</h1>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
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

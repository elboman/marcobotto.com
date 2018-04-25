import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { PageWrapper, PageContent, PageTitle, Metadata } from '@components';
import { Menu, Footer } from '@features';

import '@utils/globalStyles';

const _Title = styled(PageTitle)`
  font-size: 2.5rem;
`;

const _Content = styled.div`
  p {
    font-size: 1.5rem;
  }
`;

export default () => {
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <Metadata title="About Marco Botto" url="/about" />
        <PageTitle>Ciao.</PageTitle>
        <_Content>
          <p>
            My name is Marco Botto.<br />I'm a Front End Engineer at Facebook.
          </p>
          <p>
            I love programming, music and gaming. I'm an active{' '}
            <Link to="/open-source">open source contributor</Link> and I
            (sometimes) write <Link to="/blog">blog posts</Link> about
            javascript, web development, react and other stuff.
          </p>
          <p>
            You can also find me on{' '}
            <a href="https://twitter.com/elboman">twitter</a>,{' '}
            <a href="https://github.com/elboman">github</a> and{' '}
            <a href="https://www.linkedin.com/in/elboman/">linkedin</a>.
          </p>
        </_Content>
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

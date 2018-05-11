import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { PageWrapper, PageContent, PageTitle, Metadata } from '@components';
import { Menu, Footer } from '@features';

import '@utils/globalStyles';

const Content = styled.div`
  p {
    font-size: 1.5rem;
  }
`;

const AsciiArt = styled.pre`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const S = {
  Content,
  AsciiArt,
};

export default () => {
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <Metadata title="404" />
        <PageTitle>404</PageTitle>
        <S.Content>
          <S.AsciiArt>(╯°□°)╯彡┻━┻</S.AsciiArt>
          <p>Oops. Sorry, not found.</p>
        </S.Content>
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

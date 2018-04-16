import React from 'react';

import { PageWrapper, PageContent, Button } from '@components';
import { Menu, Footer } from '@features';

import '@utils/globalStyles';

export default () => (
  <PageWrapper>
    <Menu />
    <PageContent>
      Hello world!<br />
    </PageContent>
    <Footer />
  </PageWrapper>
);

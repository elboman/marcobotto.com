import React from 'react';
import styled from 'react-emotion';
import { format } from 'date-fns';

import { CodeIcon, LoveIcon } from '@components';

const _Footer = styled.footer`
  font-style: italic;
  font-size: 0.8rem;
`;

const Icon = styled.span`
  display: inline-block;
  width: 0.8rem;
  position: relative;
  bottom: -0.15rem;
  margin: 0 0.1rem;
`;

const FirstIcon = styled(Icon)`
  margin: 0 0.1rem 0 0;
  bottom: -0.1rem;
`;

const year = format(new Date(), 'YYYY');

export const Footer = () => (
  <_Footer>
    &copy; {year} Marco Botto.<br />
    Happily{' '}
    <FirstIcon>
      <a href="https://github.com/elboman/marcobotto.com">
        <CodeIcon />
      </a>
    </FirstIcon>{' '}
    with <a href="https://github.com/gatsbyjs/gatsby">gatsby.js</a>
  </_Footer>
);

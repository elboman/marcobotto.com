import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

import { mq } from '@utils';

const _Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem;

  ${mq.large(css`
    max-width: 46rem;
    padding: 1rem 0 2rem;
  `)};
`;

export const PageWrapper = props => <_Wrapper {...props} />;

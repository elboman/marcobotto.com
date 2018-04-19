import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

import { mq } from '@utils';

const _Content = styled.div`
  padding: 2rem 0;
`;

export const PageContent = props => <_Content {...props} />;

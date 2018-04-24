import React from 'react';
import styled from 'react-emotion';

const _Title = styled.h1`
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 2rem;
`;

export const PageTitle = props => <_Title {...props} />;

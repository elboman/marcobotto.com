import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { navigateTo } from 'gatsby-link';

import { ButtonLink } from '@components';
import { colors, mq } from '@utils';

const _Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const _ProfilePic = styled.div`
  border: 4px solid ${colors.black};
  overflow: hidden;
  margin: 0 1rem 0 0;
  border-radius: 0.5rem;
  width: 3.5rem;
  height: 3.5rem;
  flex: 0 0 3.5rem;

  & > img {
    width: 100%;
    height: 100%;
  }

  ${mq.large(css`
    margin: 0 1.5rem 0 0;
    width: 5.5rem;
    height: 5.5rem;
    flex: 0 0 5.5rem;
  `)};
`;

const _MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;

  a {
    margin-right: 0.5rem;

    ${mq.large(css`
      margin-right: 1rem;
    `)};
  }
`;

export const Menu = props => (
  <_Wrapper>
    <_ProfilePic>
      <img src="/elbo.jpg" />
    </_ProfilePic>
    <_MenuWrapper>
      <ButtonLink to="/blog">Blog</ButtonLink>
      <ButtonLink to="/about">About</ButtonLink>
      <ButtonLink to="/open-source">Open Source</ButtonLink>
    </_MenuWrapper>
  </_Wrapper>
);

import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

import { colors, mq } from '@utils';

export function getStyledButton(Comp) {
  const _OuterButton = styled(Comp)`
    display: block;
    background-image: none;
    cursor: pointer;
    color: ${colors.black};
    text-decoration: none;

    &:focus {
      outline: 0;
    }
  `;

  const _InnerButton = styled.div`
    background: white;
    border: 3px solid ${colors.black};
    border-radius: 5px;
    box-shadow: 4px 4px 0px ${colors.black};
    margin: 0 4px 4px 0;
    padding: 0.3rem 0.4rem;

    ${mq.large(css`
      padding: 0.3rem 0.6rem;
    `)};

    &:active {
      margin: 4px 0 0 4px;
      box-shadow: none;
    }
  `;

  return ({ children, ...props }) => (
    <_OuterButton {...props}>
      <_InnerButton>{children}</_InnerButton>
    </_OuterButton>
  );
}

export const Button = getStyledButton('button');

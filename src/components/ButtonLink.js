import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { colors } from '@utils';

import { getStyledButton } from './Button';

const buttonActiveClass = css`
  & > div {
    border-color: ${colors.menuActive};
    box-shadow: 4px 4px 0px ${colors.menuActive};
  }
`;

const Button = getStyledButton(Link);

export const ButtonLink = props => (
  <Button {...props} exact activeClassName={buttonActiveClass} />
);

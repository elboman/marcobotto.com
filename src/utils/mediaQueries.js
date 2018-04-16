import { css } from 'emotion';

const breakpoints = {
  small: 36,
  large: 48,
};

export const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  let prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:';
  let suffix = typeof breakpoints[label] === 'string' ? '' : 'rem';
  accumulator[label] = cls =>
    css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `;
  return accumulator;
}, {});

import { injectGlobal as css } from 'emotion';

import { colors } from '@utils';

const prismColors = {
  base: '#FFFFFF',
  char: '#D8DEE9',
  comment: '#999999',
  keyword: '#c5a5c5',
  lineHighlight: '#14161a',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#5FB3B3',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
};

// const prismColors = {
//   base: '#fff',
//   char: '#D8DEE9',
//   comment: '#bf947b',
//   keyword: '#9d5d9d',
//   lineHighlight: '#14161a',
//   primitive: '#5a9bcf',
//   string: '#2d8c33',
//   variable: '#3d64a6',
//   boolean: '#904119',
//   punctuation: '#348080',
//   tag: '#3d64a6',
//   function: '#2d79c4',
//   className: '#bc3f04',
//   method: '#6699CC',
//   operator: '#3d64a6',
// };

css`
  pre {
    margin-bottom: 0;
  }
  .gatsby-highlight {
    margin-top: 1.5rem;
    margin-left: -2rem;
    margin-right: -2rem;
    margin-bottom: 1.5rem;
    background: #222;
    color: ${prismColors.base};
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;
    padding: 1rem 2rem;
    border: 4px solid ${colors.dark};
  }

  .gatsby-highlight code[class*='gatsby-code-'],
  .gatsby-highlight pre[class*='gatsby-code-'],
  .gatsby-highlight pre.prism-code {
    height: auto !important;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .gatsby-highlight + .gatsby-highlight {
    margin-top: 1.5rem;
  }

  .gatsby-highlight-code-line {
    background-color: ${prismColors.lineHighlight};
    display: block;
    margin: -0.125rem calc(-1rem - 15px);
    padding: 0.125rem calc(1rem + 15px);
  }

  .token.attr-name {
    color: ${prismColors.keyword};
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${prismColors.comment};
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${prismColors.primitive};
  }

  .token.boolean {
    color: ${prismColors.boolean};
    font-weight: 600;
  }

  .token.tag {
    color: ${prismColors.tag};
  }

  .token.string {
    color: ${prismColors.string};
  }

  .token.punctuation {
    color: ${prismColors.punctuation};
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${prismColors.char};
  }

  .token.function {
    color: ${prismColors.function};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: ${prismColors.variable};
  }

  .token.attr-value {
    color: ${prismColors.string};
  }

  .token.keyword {
    color: ${prismColors.keyword};
    font-style: italic;
  }

  .token.atrule,
  .token.class-name {
    color: ${prismColors.className};
  }

  .token.important {
    font-weight: 400;
  }

  .token.bold {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;

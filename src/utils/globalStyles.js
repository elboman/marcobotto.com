import { injectGlobal } from 'emotion';

import { colors } from '@utils';

import './prismjs';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 100%;
    background-color: ${colors.bg};
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  h1 {
    margin-top: 0;
    font-size: 3rem;
  }
  p, li {
    font-size: 1.2rem;
  }
  li {
    font-size: 1.1rem;
  }
  p > code, li > code, a > code, h2 > code, h3 > code, h4 > code, h5 > code, h6 > code {
    background: khaki;
    padding: 0.1rem 0.3rem;
    font-size: 0.95rem;
    line-height: inherit;
    font-weight: 400;
  }
  h2 > code, h3 > code, h4 > code, h5 > code, h6 > code {
    background: none;
    font-weight: 800;
    font-size: 1rem;
    padding: 0;
  }
  h2 {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
  h4 {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  a {
    text-shadow: none;
    background: none;
    text-decoration: underline;
    color: ${colors.link};
  }
  a code {
    color: ${colors.black};
    text-decoration: underline;
  }
  code, pre {
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
  }
  blockquote {
    border-color: ${colors.link}
  }
`;

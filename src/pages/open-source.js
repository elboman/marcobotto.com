import React from 'react';
import styled from 'react-emotion';

import { PageWrapper, PageContent, Icons, Metadata } from '@components';
import { Menu, Footer } from '@features';
import { colors } from '@utils';

import '@utils/globalStyles';

const { ExternalLink } = Icons;

const _Projects = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-auto-rows: minmax(100%, 100%);
`;

const _Project = styled.div``;

const _NameLink = styled.a`
  color: ${colors.black};
  background: ${colors.activeLight};
  padding: 0.1rem 0.3rem;
  font-size: 1.2rem;
  line-height: inherit;
  font-weight: 400;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  margin-bottom: 0.4rem;
`;

const _Description = styled.p`
  font-style: italic;
  margin-top: 0.4rem;
  margin-bottom: 0;
`;

const ExternalLinkIcon = styled(ExternalLink)`
  width: 1rem;
  margin-left: 0.5rem;
  position: relative;
  top: 0.2rem;
`;

const projects = [
  {
    name: '@uirouter/react',
    description: 'React implementation of the popular UI-Router library.',
    url: 'https://github.com/ui-router/react',
  },
  {
    name: '@uirouter/readux',
    description: 'UI-Router plugin for Redux integration.',
    url: 'https://github.com/ui-router/redux',
  },
  {
    name: 'gatsby-remark-embedded-codesandbox',
    description:
      'A Gatsby Remark plugin for embedding Codesandbox given a folder of files.',
    url: 'https://github.com/elboman/gatsby-remark-embedded-codesandbox',
  },
  {
    name: 'proofed',
    description: 'User interaction validation library for React.',
    url: 'https://github.com/elboman/proofed',
  },
];

export default () => {
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <Metadata title="Open Source Projects" url="/open-source" />
        <_Projects>
          {projects.map(prj => (
            <_Project key={prj.url}>
              <_NameLink href={prj.url}>{prj.name}</_NameLink>
              <ExternalLinkIcon />
              <_Description>{prj.description}</_Description>
            </_Project>
          ))}
        </_Projects>
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

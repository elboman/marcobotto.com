import React from 'react';
import { Helmet } from 'react-helmet';

export const Metadata = ({
  imgUrl = '/elbo.jpg',
  url = '',
  title = '',
  description = "Ciao. My name is Marco Botto. I'm a Front End Engineer at Facebook.",
  children,
  ...rest
}) => {
  let pageTitle = title ? `${title} - marcobotto.com` : 'marcobotto.com';
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:url" content={`https://marcobotto.com${url}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`https://marcobotto.com${imgUrl}`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://marcobotto.com${imgUrl}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Helmet>
  );
};

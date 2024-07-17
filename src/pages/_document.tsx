import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/favicon.svg`}
          type="image/svg+xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

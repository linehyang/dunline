import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link
            rel="preload"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
          />
          <link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
            crossOrigin="anonymous"
          />
          <meta
            name="description"
            content="DunLine - 던전앤파이터 105레벨 에픽장비 득템여부 확인, 컨셉별 아이템 세팅 가이드 "
          />
          <meta property="og:title" content="DunLine" />
          {/* <meta property="og:url" content="https://www.naver.com/" /> */}
          <meta
            property="og:image"
            content="/images/dunline_logo/dunline_logo_box@2x.png"
          />
          <meta
            property="og:description"
            content="DunLine - 던전앤파이터 105레벨 에픽장비 득템여부 확인, 컨셉별 아이템 세팅 가이드 "
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

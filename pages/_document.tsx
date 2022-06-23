import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
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
          <link rel="icon" href="images/dunline_logo/dunline_logo.png" />
          <meta property="og:site_name" content="던라인(Dunline)" />
          <meta property="og:title" content="던라인(Dunline)" />
          <meta property="og:url" content="https://dunline.kr/" />
          <meta
            property="og:image"
            content="/images/dunline_logo/dunline_logo.png"
          />
          <meta
            property="og:description"
            content="던라인 - 던전앤파이터 105레벨 에픽장비 득템여부 확인, 컨셉별 아이템 세팅 가이드 "
          />
          <meta
            name="google-site-verification"
            content="_8VLTExsiIaXorCRPcs6E0VBkJVnsyY4n21LCdG1aEc"
          />
          <meta
            name="naver-site-verification"
            content="5464fe2b1ba430084d214fec75ced665fb959092"
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

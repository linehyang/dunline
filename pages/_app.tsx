import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { SWRConfig } from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <Global
        styles={`
          html, body {
            height: 100%;
            color: #ffffff;
            background-color: #000000;
          }

          ul, ol {
            list-style: none;
          }

          #__next {
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
            min-width: 320px;
            width: 100%;
            height: 100%;
          }
        `}
      />
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;

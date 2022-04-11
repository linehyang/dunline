import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
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

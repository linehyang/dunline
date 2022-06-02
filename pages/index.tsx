import { useState } from "react";
import Head from "next/head";
import { AspectRatio, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";

import SearchForm from "../components/Search/SearchForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <Box display="flex" flexDirection="column" height="100%">
        <Header />
        <Box
          as="main"
          flex="1"
          width="100%"
          maxWidth="800px"
          margin="0 auto"
          padding="0 20px"
        >
          <AspectRatio
            ratio={454 / 142}
            maxWidth="454px"
            margin="43px auto 50px"
          >
            <Image
              src="/images/dunline_logo/dunline_logo_box@2x.png"
              alt="dunline hearder logo"
              layout="fill"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </AspectRatio>
          <SearchForm
            handleSubmit={(url) => {
              setUrl(url);
            }}
          />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;

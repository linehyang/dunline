import { useState } from "react";
import Head from "next/head";
import { AspectRatio, Box, VisuallyHidden, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";

import SearchForm from "../components/Search/SearchForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [_, setUrl] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>던라인</title>
        <meta
          name="description"
          content="던라인 - 던전앤파이터 105레벨 에픽장비 득템여부 확인, 컨셉별 아이템 세팅 가이드 "
        />
        <meta
          name="keywords"
          content="던파, 던전앤파이터, 105레벨,애팍세팅, 컨셉, 커스텀"
        />
      </Head>
      <Box display="flex" flexDirection="column" height="100%">
        <VisuallyHidden>
          <Heading as="h1">DUNLINE - 던라인</Heading>
        </VisuallyHidden>
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
            ratio={227 / 71}
            maxWidth="454px"
            margin="43px auto 50px"
          >
            <Image
              src="/images/dunline_logo/dunline_logo_box.webp"
              alt="dunline hearder logo"
              layout="fill"
              priority
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

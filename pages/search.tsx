import { useState } from "react";
import Head from "next/head";
import { Box, VisuallyHidden, Heading } from "@chakra-ui/react";

import SearchForm from "../components/Search/SearchForm";
import CharacterList from "../components/Search/CharacterList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

function Search() {
  const [url, setUrl] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>던라인 - 캐릭터 검색</title>
        <meta
          name="description"
          content="확인하고자 하는 캐릭터를 찾을 수 있습니다."
        />
      </Head>
      <VisuallyHidden>
        <Heading as="h1">던라인 - 캐릭터 검색</Heading>
      </VisuallyHidden>
      <Box display="flex" flexDirection="column" height="100%">
        <Header showLogo />
        <Box
          as="main"
          flex="1"
          width="100%"
          maxWidth="800px"
          margin="60px auto 0"
          padding="0 20px"
        >
          <SearchForm
            handleSubmit={(url) => {
              setUrl(url);
            }}
          />
          <CharacterList url={url} />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Search;

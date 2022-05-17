import { useState, useEffect } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SearchForm from "../components/Search/SearchForm";
import CharacterList from "../components/Search/CharacterList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { SERVER_LIST } from "../interface/characterSearch";

function Search() {
  const router = useRouter();
  const { serverName, characterName } = router.query;

  const search = {
    serverName: serverName as string,
    characterName: characterName as string,
  };

  const [url, setUrl] = useState<string | null>(
    search
      ? `/api/search?serverName=${
          search.serverName
        }&characterName=${encodeURIComponent(search.characterName as string)}`
      : null
  );

  return (
    <>
      <Head>
        <title>DUNLINE</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box display="flex" flexDirection="column" height="100%">
        <Header LogoHandler={true} />
        <Box
          as="main"
          flex="1"
          width="100%"
          minWidth="320px"
          maxWidth="800px"
          margin="60px auto 0"
          padding="0 20px"
        >
          <SearchForm
            handleSubmit={(url) => {
              setUrl(url);
            }}
            search={search}
          />
          <CharacterList url={url} />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Search;
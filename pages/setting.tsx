import { useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import { Box, VisuallyHidden, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import UserEquipInfo from "../components/Setting/UserEquipInfo";
import UserEquipDetail from "../components/Setting/UserEquipDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ErrorModal from "../components/Others/ErrorModal";
import { UserEquipInfoType } from "../interface/equipInfo";

function Setting() {
  const router = useRouter();
  const { server, characterid } = router.query;

  const [invalidParamsError, setInvalidParamsError] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const { data } = useSWR<UserEquipInfoType>(url);

  const [conceptSelect, setConceptSelect] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      if (server === undefined || characterid === undefined) {
        setInvalidParamsError(true);
        return;
      }

      setUrl(`api/userEquipInfo?server=${server}&characterid=${characterid}`);
    }
  }, [router.isReady]);

  if (invalidParamsError) {
    return (
      <ErrorModal
        onClose={() => {
          router.replace("/");
        }}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>DUNLINE - 캐릭터 인게임 정보</title>
      </Head>
      <VisuallyHidden>
        <Heading as="h1">던라인 - 인게임 세팅</Heading>
      </VisuallyHidden>
      <Box display="flex" flexDirection="column" height="100%">
        <Header server={server} characterid={characterid} showLogo />
        <Box
          as="main"
          flex="1"
          width="100%"
          maxWidth="800px"
          margin="60px auto"
          padding="0 20px"
        >
          <UserEquipInfo
            data={data}
            conceptSelect={conceptSelect}
            hoverWearItem={(concept) => {
              setConceptSelect(concept);
            }}
          />
          <Box
            marginTop="50px"
            borderBottom="2px solid gray"
            borderTop="2px solid gray"
          >
            <UserEquipDetail data={data} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Setting;

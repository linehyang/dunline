import Head from "next/head";
import useSWR from "swr";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import UserEquipInfo from "../components/Setting/UserEquipInfo";
import UserEquipDetail from "../components/Setting/UserEquipDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ErrorModal from "../components/Others/ErrorModal";
import { UserEquipInfoType } from "../interface/equipInfo";

function Setting() {
  const router = useRouter();
  const { server, characterid } = router.query;

  const [conceptSelect, setConceptSelect] = useState<string[]>([]);

  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);

  if (server === undefined || characterid === undefined) {
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

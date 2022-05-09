import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import UserEquipInfo from "../components/Setting/UserEquipInfo";
import Header from "../components/Header";

function Setting() {
  const router = useRouter();
  const { server, characterid } = router.query;

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <Header server={server} characterid={characterid} />
      <Box
        as="main"
        minWidth="320px"
        maxWidth="800px"
        height="100%"
        margin="0 auto"
        padding="0 20px"
      >
        <UserEquipInfo />
      </Box>
    </>
  );
}

export default Setting;

import Head from "next/head";
import { Box } from "@chakra-ui/react";

import UserEquipInfo from "../components/Setting/UserEquipInfo";

function Setting() {
  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <Box
        as="header"
        minWidth="320px"
        textAlign="center"
        padding="20px 0"
        fontSize="6xl"
      >
        <h1>DUNLINE</h1>
      </Box>
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

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

type EquipmentType = {
  amplificationName: string;
  enchant: {
    explain?: string;
    status?: {
      name: string;
      value: number;
    };
  };
  itemAvailableLevel: number;
  itemGradeName: string;
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemType: string;
  itemTypeDetail: string;
  refine: number;
  reinforce: number;
  slotId: string;
  slotName: string;
};

type UserEquipInfoType = {
  adventureName: string;
  characterId: string;
  characterName: string;
  equipment: EquipmentType[];
  guildId: string;
  guildName: string;
  jobGrowId: string;
  jobGrowName: string;
  jobId: string;
  jobName: string;
  level: number;
};

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
        <title>DUNLINE</title>
      </Head>
      <Box display="flex" flexDirection="column" height="100%">
        <Header server={server} characterid={characterid} LogoHandler={true} />
        <Box
          as="main"
          flex="1"
          width="100%"
          minWidth="320px"
          maxWidth="800px"
          margin="120px auto"
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

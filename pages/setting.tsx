import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Select from "react-select";
import { Box, VStack } from "@chakra-ui/react";

import UserEquipInfo from "../components/Setting/UserEquipInfo";
import AcquireEpicConcept from "../components/Setting/AcquireEpicConcept";
import { EpicConcept } from "../public/epicConcept";

type EpicConceptKeyType = keyof typeof EpicConcept;
type OptionValueType = { value: EpicConceptKeyType; label: string };

function Setting() {
  const router = useRouter();
  const { query } = router;
  const { server, characterid } = query;

  const [selectedConcept, setSelectedConcept] = useState<OptionValueType[]>([]);

  const options = Object.entries(EpicConcept).map(([epicId, epicName]) => ({
    value: epicId as EpicConceptKeyType,
    label: epicName,
  }));

  const selectCustomStyles = {
    menu: () => ({
      borderBottom: "1px dotted pink",
      background: "#eeeeee",
      color: "gray",
    }),
  };

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <main>
        <UserEquipInfo server={server} characterid={characterid} />
        <Box width={"500px"}>
          <Select
            styles={selectCustomStyles}
            options={options}
            closeMenuOnSelect={false}
            onChange={(concept) => {
              setSelectedConcept([...concept]);
            }}
            placeholder={`원하는 컨셉을 선택해주세요`}
            noOptionsMessage={() => "검색하신 컨셉은 존재하지 않습니다"}
            isMulti
          />
        </Box>
        <AcquireEpicConcept
          server={server}
          characterid={characterid}
          selectedConcept={selectedConcept}
        />
      </main>
    </>
  );
}

export default Setting;

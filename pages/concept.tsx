import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import AcquireEpicConcept from "../components/Concept/AcquireEpicConcept";
import ConceptSelect from "../components/Concept/ConceptSelect";
import WearItem from "../components/Concept/WearItem";
import EquipEpicConcept from "../components/Concept/EquipEpicConcept";

import { EpicConcept, EpicInfoEquip, EpicItems } from "../public/epic";

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type OptionValue = { value: EpicConceptKeyType; label: string };

function Concept() {
  const router = useRouter();
  const { server, characterid } = router.query;

  const [selectedConcept, setSelectedConcept] = useState<OptionValue[]>([]);
  const [conceptSelect, setConceptSelect] = useState<
    { itemId: string; itemName: string }[]
  >([]);
  const [wearItem, setWearItem] = useState<
    Record<EpicInfoEquipKeyType, string>
  >({
    SHOULDER: "",
    JACKET: "",
    PANTS: "",
    WAIST: "",
    SHOES: "",
    WRIST: "",
    AMULET: "",
    SUPPORT: "",
    RING: "",
    EARRING: "",
    MAGIC_STON: "",
  });

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <Header server={server} characterid={characterid} LogoHandler={true} />
      <Box
        as="main"
        minWidth="320px"
        maxWidth="800px"
        height="100%"
        margin="0 auto"
        padding="0 20px"
      >
        <Box display="flex">
          <WearItem
            wearItem={wearItem}
            resetWearItem={() =>
              setWearItem({
                SHOULDER: "",
                JACKET: "",
                PANTS: "",
                WAIST: "",
                SHOES: "",
                WRIST: "",
                AMULET: "",
                SUPPORT: "",
                RING: "",
                EARRING: "",
                MAGIC_STON: "",
              })
            }
            toggleWearItem={(slotId) => {
              setWearItem({
                ...wearItem,
                [slotId]: "",
              });
            }}
            hoveredConcept={conceptSelect}
          />
          <EquipEpicConcept
            wearItem={wearItem}
            hoverWearItem={(concept) => {
              setConceptSelect(concept);
            }}
          />
        </Box>
        <ConceptSelect onChange={setSelectedConcept} />
        <AcquireEpicConcept
          server={server}
          characterid={characterid}
          selectedConcept={selectedConcept}
          setWearItem={setWearItem}
          wearItem={wearItem}
        />
      </Box>
    </>
  );
}

export default Concept;

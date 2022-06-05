import Head from "next/head";
import { Box, Heading, VisuallyHidden } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import Header from "../components/Header/Header";
import AcquireEpicConcept from "../components/Concept/AcquireEpicConcept";
import ConceptSelect from "../components/Concept/ConceptSelect";
import WearItem from "../components/Concept/WearItem";
import Footer from "../components/Footer";

import { EpicConcept, EpicInfoEquip } from "../public/epic";

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
        <title>DUNLINE - 득템 여부 및 컨셉 확인</title>
      </Head>
      <VisuallyHidden>
        <Heading as="h1">던라인 - 컨셉 커스텀</Heading>
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
            hoverWearItem={(concept) => {
              setConceptSelect(concept);
            }}
          />
          <ConceptSelect onChange={setSelectedConcept} />
          <AcquireEpicConcept
            server={server}
            characterid={characterid}
            selectedConcept={selectedConcept}
            setWearItem={setWearItem}
            wearItem={wearItem}
          />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Concept;

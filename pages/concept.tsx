import Head from "next/head";
import { Box, Heading, VisuallyHidden } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

import Header from "../components/Header/Header";
import AcquireEpicConcept from "../components/Concept/AcquireEpicConcept";
import ConceptSelect from "../components/Concept/ConceptSelect";
import WearItem from "../components/Concept/WearItem";
import Footer from "../components/Footer";
import { UserEquipInfoType } from "../interface/equipInfo";
import { convertItemId } from "../util/conceptitemUtil";

import { EpicConcept, EpicInfoEquip } from "../data/epic";

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type OptionValue = { value: EpicConceptKeyType; label: string };

const DEFAULT_WEARITEMS = {
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
};

function Concept() {
  const router = useRouter();
  const { server, characterid } = router.query;

  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);

  const [selectedConcept, setSelectedConcept] = useState<OptionValue[]>([]);
  const [conceptSelect, setConceptSelect] = useState<
    { itemId: string; itemName: string }[]
  >([]);
  const [wearItem, setWearItem] =
    useState<Record<EpicInfoEquipKeyType, string>>(DEFAULT_WEARITEMS);

  useEffect(() => {
    const initailWearItem = data?.equipment
      .map(({ slotId, itemName, itemId }) => {
        const converItemId = convertItemId(itemName);

        if (!converItemId) {
          return { [slotId]: itemId };
        }
        if (Object.keys(wearItem).includes(slotId)) {
          return { [slotId]: converItemId };
        }
      })
      .filter(Boolean)
      .reduce((_, wearitem) => {
        return { ..._, ...wearitem };
      }, {});

    setWearItem({ ...wearItem, ...initailWearItem });
  }, [data]);

  return (
    <>
      <Head>
        <title>던라인 - 득템 여부 및 컨셉 커스텀</title>
        <meta name="description" content="컨셉별 득템 여부 및 컨셉 커스텀 " />
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
            resetWearItem={() => {
              setWearItem(DEFAULT_WEARITEMS);
            }}
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
            data={data as UserEquipInfoType}
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

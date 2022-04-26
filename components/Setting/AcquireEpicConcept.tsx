import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Box, Tooltip, Text } from "@chakra-ui/react";

import { EpicConcept, EpicItems, EpicInfoEquip } from "../../public/epic";

import HoverEpicInfo from "./HoverEpicInfo";
import ConceptFilter from "./ConceptFilter";
import WearItem from "./WearItem";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

export default function AcquireEpicConcept({ server, characterid }: Props) {
  const { data } = useSWR(
    () =>
      server &&
      characterid &&
      "/api/currentStateEpic?server=" + server + "&characterid=" + characterid
  );

  const [concepts, setConcepts] = useState<EpicConceptKeyType[]>([]);
  const [wearItem, setWearItem] = useState<
    Record<EpicInfoEquipKeyType, string>
  >({
    JACKET: "",
    PANTS: "",
    SHOULDER: "",
    WAIST: "",
    SHOES: "",
    WRIST: "",
    AMULET: "",
    RING: "",
    SUPPORT: "",
    MAGIC_STON: "",
    EARRING: "",
  });

  return (
    <>
      <Box>컨셉별 에픽 득템 현황</Box>
      {data && (
        <ConceptFilter
          concepts={concepts}
          onClick={(key: EpicConceptKeyType) => {
            if (concepts.includes(key)) {
              setConcepts(concepts.filter((concept) => concept !== key));
            } else {
              setConcepts([...concepts, key]);
            }
          }}
        />
      )}
      {data &&
        concepts.map((concept) => (
          <Box key={concept}>
            <Text>{EpicConcept[concept]}</Text>
            <Box display={"flex"} flexWrap={"wrap"}>
              {EpicItems.filter((epicItem) =>
                epicItem.concepts?.includes(concept)
              ).map(({ itemId, itemName, parts }) => (
                <Tooltip
                  label={<HoverEpicInfo itemId={itemId} />}
                  fontSize="md"
                  key={`${EpicConcept[concept]}${itemName}`}
                >
                  <Box
                    filter={
                      data.includes(itemId)
                        ? "grayscale(0%)"
                        : "grayscale(100%)"
                    }
                  >
                    <Box fontSize={"8px"} textAlign={"center"}>
                      {EpicInfoEquip[parts as EpicInfoEquipKeyType]}
                    </Box>
                    <Image
                      src={`https://img-api.neople.co.kr/df/items/${itemId}`}
                      alt={"에픽아이템"}
                      width={"30px"}
                      height={"30px"}
                      onClick={() => {
                        setWearItem({
                          ...wearItem,
                          [parts]: itemId,
                        });
                      }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        ))}
      <WearItem wearItem={wearItem} />
    </>
  );
}

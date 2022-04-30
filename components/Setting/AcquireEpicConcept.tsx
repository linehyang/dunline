import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Box, Tooltip, Text } from "@chakra-ui/react";

import { EpicConcept, EpicItems, EpicInfoEquip } from "../../public/epic";

import HoverEpicInfo from "./HoverEpicInfo";
import WearItem from "./WearItem";

import EpicItemToolTip from "./EpicItemToolTip";

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type OptionValue = { value: EpicConceptKeyType; label: string };

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
  selectedConcept: OptionValue[];
};

export default function AcquireEpicConcept({
  server,
  characterid,
  selectedConcept,
}: Props) {
  const { data } = useSWR(
    () =>
      server &&
      characterid &&
      "/api/currentStateEpic?server=" + server + "&characterid=" + characterid
  );

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
      <WearItem wearItem={wearItem} />
      <Box>컨셉별 에픽 득템 현황</Box>
      {data &&
        selectedConcept.map(({ value }) => {
          return (
            <Box key={value}>
              <Text>{EpicConcept[value]}</Text>
              <Box display={"flex"} flexWrap={"wrap"}>
                {EpicItems.filter((epicItem) =>
                  epicItem.concepts?.includes(value)
                ).map(({ itemId, itemName, parts }) => (
                  <EpicItemToolTip
                    key={`${EpicConcept[value]}${itemName}`}
                    itemName={itemName}
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
                  </EpicItemToolTip>
                ))}
              </Box>
            </Box>
          );
        })}
    </>
  );
}

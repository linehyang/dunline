import { SetStateAction, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";

import { EpicConcept, EpicItems, EpicInfoEquip } from "../../public/epic";

import EpicItemToolTip from "../Others/EpicItemToolTip";

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type OptionValue = { value: EpicConceptKeyType; label: string };

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
  selectedConcept: OptionValue[];
  wearItem: Record<EpicInfoEquipKeyType, string>;
  setWearItem: (
    value: SetStateAction<Record<EpicInfoEquipKeyType, string>>
  ) => void;
};

export default function AcquireEpicConcept({
  server,
  characterid,
  selectedConcept,
  wearItem,
  setWearItem,
}: Props) {
  const { data } = useSWR<string[]>(
    () =>
      server &&
      characterid &&
      "/api/currentStateEpic?server=" + server + "&characterid=" + characterid,
    {
      fallbackData: EpicItems.map((item) => item.itemId),
    }
  );

  if (!selectedConcept.length) {
    return (
      <Box marginTop="50px" fontSize="25px">
        컨셉이 설정되지 않았습니다.
      </Box>
    );
  }

  return (
    <>
      <Box marginTop="50px" fontSize="25px" fontWeight="700">
        컨셉별 에픽 득템 현황
      </Box>
      {selectedConcept.map(({ value }) => {
        return (
          <Box key={value} marginTop="20px" borderTop="1px solid #fff">
            <Text margin="10px 0 " fontWeight="500">
              {EpicConcept[value]}
            </Text>
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
                      data?.includes(itemId)
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

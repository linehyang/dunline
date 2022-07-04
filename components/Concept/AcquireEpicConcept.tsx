import { SetStateAction } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Box, Text, useToast } from "@chakra-ui/react";

import { EpicConcept, EpicItems, EpicInfoEquip } from "../../data/epic";

import EpicItemToolTip from "../Others/EpicItemToolTip";

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type OptionValue = { value: EpicConceptKeyType; label: string };

interface Props {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
  selectedConcept: OptionValue[];
  wearItem: Record<EpicInfoEquipKeyType, string>;
  setWearItem: (
    value: SetStateAction<Record<EpicInfoEquipKeyType, string>>
  ) => void;
}

export default function AcquireEpicConcept({
  server,
  characterid,
  selectedConcept,
  wearItem,
  setWearItem,
}: Props) {
  const toast = useToast();
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
      <>
        <Box marginTop="50px" fontSize="25px">
          컨셉이 설정되지 않았습니다.
        </Box>
        <Box fontSize="11px" marginTop="10px" color="gray">
          * 공지 사항
          <Box>
            던전앤파이터 API 타임라인 조회는 한 번에 가져올 수 있는 데이터가
            최대 90일로 제한되어 있습니다.
          </Box>
          <Box>
            추후 DB 연결 전까지는 3월 17일부터 획득한 에픽 아이템을 확인하는
            것이 아닌, 오늘을 기준으로 90일 전까지만 획득 아이템을 확인하게끔
            변경해두었습니다.
          </Box>
        </Box>
      </>
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
              ).map(({ itemId, itemName, parts }, idx) => (
                <EpicItemToolTip
                  key={`${EpicConcept[value]}${itemName} ${idx}`}
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
                      alt={`${itemName}에픽아이템`}
                      unoptimized={true}
                      width={"30px"}
                      height={"30px"}
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      onClick={() => {
                        setWearItem({
                          ...wearItem,
                          [parts]: itemId,
                        });
                        toast({
                          title: `${itemName}을/를 추가 하였습니다.`,
                          status: "info",
                          duration: 1000,
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

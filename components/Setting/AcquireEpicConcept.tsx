import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Box, Tooltip } from "@chakra-ui/react";

import { Concept, EpicConcept } from "../../public/epicConcept";
import { EpicInfo, EpicInfoEquip } from "../../public/epicInfo";
import HoverEpicInfo from "./HoverEpicInfo";
import ConceptFilter from "./ConceptFilter";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

// 컨셉 영어를 한글로 바꿔주는 함수
function conCeptFilter(concept: string) {
  let result: string = "";
  Object.entries(EpicConcept).map(([key, value]) => {
    if (key === concept) {
      result = value;
    }
  });
  return result;
}

//특정 에픽이 어느부위인지 알려주는 함수
function equipFilter(equip: string) {
  let result: string = "";
  Object.entries(EpicInfo).map(([item, itemObject]) => {
    if (Object.prototype.hasOwnProperty.call(itemObject, equip)) {
      result = item;
      return item;
    }
  });

  return result;
}

type EpicConceptKeyType = keyof typeof EpicConcept;

export default function AcquireEpicConcept({ server, characterid }: Props) {
  const { data } = useSWR(
    () =>
      server &&
      characterid &&
      "/api/currentStateEpic?server=" + server + "&characterid=" + characterid
  );

  const [concepts, setConcepts] = useState<EpicConceptKeyType[]>([]);

  return (
    <>
      <Box>컨셉별 에픽 득템 현황</Box>
      {data ? (
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
      ) : null}
      {data
        ? Object.entries(Concept)
            .filter(([concept]) =>
              concepts.includes(concept as EpicConceptKeyType)
            )
            .map(([concetp, concetpEpic]) => {
              return (
                <>
                  <Box>
                    {conCeptFilter(concetp)}
                    <Box display={"flex"} flexWrap={"wrap"}>
                      {Object.entries(concetpEpic).map(([itemId, itemName]) => {
                        return (
                          <Tooltip
                            label={<HoverEpicInfo itemId={itemId} />}
                            fontSize="md"
                            key={`${conCeptFilter(concetp)}${itemName}`}
                          >
                            <Box
                              filter={
                                data.includes(itemId)
                                  ? "grayscale(0%)"
                                  : "grayscale(100%)"
                              }
                            >
                              <Box fontSize={"2px"} textAlign={"center"}>
                                {
                                  EpicInfoEquip[
                                    equipFilter(
                                      itemId
                                    ) as keyof typeof EpicInfoEquip
                                  ]
                                }
                              </Box>
                              <Image
                                src={`https://img-api.neople.co.kr/df/items/${itemId}`}
                                alt={"에픽아이템"}
                                width={"30px"}
                                height={"30px"}
                              />
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </Box>
                </>
              );
            })
        : null}
    </>
  );
}

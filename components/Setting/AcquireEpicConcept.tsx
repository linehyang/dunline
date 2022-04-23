import useSWR from "swr";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import { Concept, EpicConcept } from "../../public/epicConcept";
import { EpicInfo, EpicInfoEquip } from "../../public/epicInfo";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

//컨셉 영어를 한글로 바꿔주는 함수
function conCeptFilter(concept: string) {
  const result = EpicConcept.filter((el) => {
    return Object.keys(el).join() === concept;
  });
  return Object.values(result[0]).join();
}

//특정 에픽이 어느부위인지 알려주는 함수
function equipFilter(equip: string) {
  //eupit은 itemId를 String으로 받아옴
  let result: string = "a";
  Object.entries(EpicInfo).map(([item, itemObject]) => {
    if (Object.prototype.hasOwnProperty.call(itemObject, equip)) {
      result = item;
      return item;
    }
  });

  return result;
}

export default function AcquireEpicConcept({ server, characterid }: Props) {
  const { data } = useSWR(
    () =>
      "/api/currentStateEpic?server=" + server + "&characterid=" + characterid
  );

  return (
    <>
      <Box>컨셉별 에픽 득템 현황</Box>
      {data
        ? Object.entries(Concept).map(([concetp, concetpEpic]) => {
            return (
              <>
                <Box>
                  {conCeptFilter(concetp)}
                  <Box display={"flex"} flexWrap={"wrap"}>
                    {concetpEpic.map((epicInfo) => {
                      return (
                        <Box
                          key={`${conCeptFilter(concetp)}${Object.keys(
                            epicInfo
                          ).join()}`}
                          filter={
                            data.includes(String(Object.keys(epicInfo)))
                              ? "grayscale(0%)"
                              : "grayscale(100%)"
                          }
                        >
                          <Box fontSize={"2px"} textAlign={"center"}>
                            {
                              EpicInfoEquip[
                                equipFilter(
                                  Object.keys(epicInfo).join()
                                ) as keyof typeof EpicInfoEquip
                              ]
                            }
                          </Box>
                          <Image
                            src={`https://img-api.neople.co.kr/df/items/${Object.keys(
                              epicInfo
                            ).join()}`}
                            alt={"에픽아이템"}
                            width={"30px"}
                            height={"30px"}
                          />
                        </Box>
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

import useSWR from "swr";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

//server와 characterid를 받아와 해당 캐릭터 장착 장비를 확인하는 컴포넌트
export default function UserEquipInfo({ server, characterid }: Props) {
  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR(url);

  return (
    <>
      {data ? <Box>{data.characterName}의 장착 장비 정보</Box> : null}
      {data
        ? data.equipment.map((equip: typeof data.equpment) => {
            return (
              <Box key={equip.slotId}>
                <div>{equip.slotName}</div>
                <Box>
                  <Image
                    src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`}
                    alt={equip.slotName}
                    width={"25px"}
                    height={"25px"}
                  />
                  <span>{equip.itemName}</span>
                  {equip.amplificationName ? (
                    <span>+{equip.reinforce}증폭</span>
                  ) : (
                    <span>+{equip.reinforce}강화</span>
                  )}
                </Box>
              </Box>
            );
          })
        : null}

      <Box borderBottom={"1px solid black"} paddingBottom={"2rem"} />
    </>
  );
}

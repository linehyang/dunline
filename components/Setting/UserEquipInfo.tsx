import useSWR from "swr";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import EpicItemToolTip from "./EpicItemToolTip";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

type EquipmentType = {
  amplificationName: string;
  enchant: {
    explain?: string;
    status?: {
      name: string;
      value: number;
    };
  };
  itemAvailableLevel: number;
  itemGradeName: string;
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemType: string;
  itemTypeDetail: string;
  refine: number;
  reinforce: number;
  slotId: string;
  slotName: string;
};

type UserEquipInfoType = {
  adventureName: string;
  characterId: string;
  characterName: string;
  equipment: EquipmentType[];
  guildId: string;
  guildName: string;
  jobGrowId: string;
  jobGrowName: string;
  jobId: string;
  jobName: string;
  level: number;
};

const LEFT_EQUIP_SLOT_IDS = ["SHOULDER", "JACKET", "PANTS", "WAIST", "SHOES"];
const RIGHT_EQUIP_SLOT_IDS = [
  "WEAPON",
  "TITLE",
  "WRIST",
  "AMULET",
  "SUPPORT",
  "RING",
  "EARRING",
  "MAGIC_STON",
];

//server와 characterid를 받아와 해당 캐릭터 장착 장비를 확인하는 컴포넌트
export default function UserEquipInfo({ server, characterid }: Props) {
  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);
  const leftEquip = LEFT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  ).filter(Boolean);

  const rightEquip = RIGHT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  ).filter(Boolean);

  if (!data) {
    return null;
  }

  return (
    <>
      <Box>{data.characterName}의 장착 장비 정보</Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        {leftEquip && (
          <Box display="flex" width="100px" flexWrap="wrap">
            {leftEquip.map((equipItemInfo) => (
              <EpicItemToolTip
                key={equipItemInfo!.itemId}
                itemName={equipItemInfo!.itemName}
              >
                <Box>
                  <Image
                    src={`https://img-api.neople.co.kr/df/items/${
                      equipItemInfo!.itemId
                    }`}
                    alt={`에픽아이템 ${equipItemInfo!.slotId}`}
                    width={"50px"}
                    height={"50px"}
                  />
                </Box>
              </EpicItemToolTip>
            ))}
          </Box>
        )}
        {rightEquip && (
          <Box display="flex" width="100px" flexWrap="wrap">
            {rightEquip.map((equipItemInfo) => (
              <EpicItemToolTip
                key={equipItemInfo!.itemId}
                itemName={equipItemInfo!.itemName}
              >
                <Box>
                  <Image
                    src={`https://img-api.neople.co.kr/df/items/${
                      equipItemInfo!.itemId
                    }`}
                    alt={`에픽아이템 ${equipItemInfo!.slotId}`}
                    width={"50px"}
                    height={"50px"}
                  />
                </Box>
              </EpicItemToolTip>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}

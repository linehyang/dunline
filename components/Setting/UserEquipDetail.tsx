import Image from "next/image";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { EpicInfoEquip } from "../../public/epic";

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

type Props = {
  data: UserEquipInfoType;
};

const EQUIP_SLOT_IDS = [
  "WEAPON",
  "TITLE",
  "JACKET",
  "SHOULDER",
  "PANTS",
  "SHOES",
  "WAIST",
  "WRIST",
  "AMULET",
  "RING",
  "SUPPORT",
  "MAGIC_STON",
  "EARRING",
];

export default function UserEquipDetail({ data }: Props) {
  const inGameData = EQUIP_SLOT_IDS.reduce((acc, slotid) => {
    const equipSlot = data.equipment.find(({ slotId }) => slotId === slotid);

    if (equipSlot) {
      return acc.concat(equipSlot);
    } else {
      return [
        ...acc,
        {
          slotId: slotid,
          slotName: EpicInfoEquip[slotid as keyof typeof EpicInfoEquip],
          amplificationName: "",
          enchant: {
            explain: "",
            status: {
              name: "",
              value: 0,
            },
          },
          itemAvailableLevel: 0,
          itemGradeName: "",
          itemId: "",
          itemName: "",
          itemRarity: "",
          itemType: "",
          itemTypeDetail: "",
          refine: 0,
          reinforce: 0,
        },
      ];
    }
  }, [] as EquipmentType[]);

  return (
    <Box>
      {inGameData.map((equipt, idx) => {
        return (
          <Box
            key={
              equipt.itemId
                ? `UserEquiptDetail ${equipt.itemId}`
                : `UserEquiptDetail ${EQUIP_SLOT_IDS[idx]}`
            }
            display="flex"
            alignItems="center"
            borderBottom="1px solid gray"
          >
            <Box position="relative" width="30px" height="30px" margin="3px 0">
              <Image
                src={
                  equipt.itemId
                    ? `https://img-api.neople.co.kr/df/items/${equipt.itemId}`
                    : `/images/emptySlot/${equipt.slotId}.png`
                }
                alt={`에픽아이템 ${equipt.itemName}`}
                layout="fill"
              />
            </Box>
            <SlotNameStyled flex="0 0 80px" margin="0 30px" textAlign="center">
              {equipt.slotName}
            </SlotNameStyled>
            <Box flex="1">{equipt.itemName}</Box>
            <Box color={equipt?.amplificationName ? "#DB00DB" : "#ffffff"}>
              {equipt.reinforce
                ? `+${equipt.reinforce}${
                    equipt?.amplificationName ? "증폭" : "강화"
                  }${equipt?.refine ? `(${equipt.refine})` : ""}`
                : ""}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

const SlotNameStyled = styled(Box)`
  @media (max-width: 576px) {
    flex: 0 0 35px;
    margin: 0 10px;
  }
`;

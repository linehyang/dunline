import Image from "next/image";
import { Box } from "@chakra-ui/react";

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

export default function UserEquipDetail({ data }: Props) {
  if (!data) {
    return null;
  }

  return (
    <Box flex="1">
      {data.equipment.map((equipt) => {
        return (
          <Box
            key={equipt.itemId}
            display="flex"
            border="1px solid #ffffff"
            borderRadius="4px"
            textAlign="center"
          >
            <Image
              src={`https://img-api.neople.co.kr/df/items/${equipt.itemId}`}
              alt={`에픽아이템 ${equipt.itemName}`}
              width={"30px"}
              height={"30px"}
            />
            <Box flex="2">{equipt.slotName}</Box>
            <Box flex="7">{equipt.itemName}</Box>
            <Box
              flex="3"
              color={equipt?.amplificationName ? "#DB00DB" : "#ffffff"}
            >
              +{equipt.reinforce}
              {equipt?.amplificationName ? "증폭" : "강화"}
              {equipt?.refine ? `(${equipt.refine})` : null}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

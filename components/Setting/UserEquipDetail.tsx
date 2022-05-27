import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { EpicInfoEquip } from "../../public/epic";
import { ITEM_RARITY } from "../../interface/itemRarityInfo";
import {
  EquipmentType,
  UserEquipInfoType,
  GrowInfoType,
} from "../../interface/equipInfo";

interface Props {
  data: UserEquipInfoType;
}

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

  const growInfoExchange = (options: GrowInfoType[]) => {
    if (!options) {
      return;
    }
    return options.map(({ level }, idx) => {
      return level;
    });
  };

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
            {equipt.itemRarity !== "신화" ? (
              <Box flex="1">
                <Box
                  color={
                    ITEM_RARITY[equipt.itemRarity as keyof typeof ITEM_RARITY]
                  }
                >
                  {equipt.itemName}
                </Box>
                {equipt.growInfo ? (
                  <Box fontSize="14px" display="flex">
                    {growInfoExchange(
                      equipt.growInfo?.options as GrowInfoType[]
                    )?.map((level, idx) => {
                      return (
                        <LevelStyled
                          key={`InGame GrowInfo ${equipt.itemName} ${idx}`}
                          level={level}
                        >
                          {level}
                        </LevelStyled>
                      );
                    })}
                  </Box>
                ) : null}
              </Box>
            ) : (
              <Text
                flex="1"
                color={
                  ITEM_RARITY[equipt.itemRarity as keyof typeof ITEM_RARITY]
                }
                bgGradient={[
                  "linear(to-t,#ff9600, #a52fc8)",
                  "linear(to-b, rgb(255, 150, 0), rgb(165, 47, 200))",
                ]}
                bgClip="text"
              >
                {equipt.itemName}
              </Text>
            )}

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

const LevelStyled = styled(Box)`
  margin-right: 6px;
  color: ${(props) => {
    if (props.level < 20) {
      return "#ffffff";
    } else if (props.level > 20 && props.level < 51) {
      return "#68D5ED";
    } else {
      return "#B36BFF";
    }
  }};
`;

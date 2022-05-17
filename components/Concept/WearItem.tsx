import { Box, Button } from "@chakra-ui/react";
import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

import EpicItemToolTip from "../Setting/EpicItemToolTip";
import { SERVER_LIST } from "../../interface/characterSearch";

type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type EpicConceptKeyType = keyof typeof EpicConcept;
type EquipTpye = { slotId: string; itemId: string };
type wearItemType = {
  AMULET: string;
  EARRING: string;
  JACKET: string;
  MAGIC_STON: string;
  PANTS: string;
  RING: string;
  SHOES: string;
  SHOULDER: string;
  SUPPORT: string;
  WAIST: string;
  WRIST: string;
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

interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
  // onClick: () => void;
  resetWearItem: () => void;
  toggleWearItem: (slotId: string) => void;
  hoveredConcept: { itemId: string; itemName: string }[];
}

const LEFT_EQUIP_SLOT_IDS = ["SHOULDER", "JACKET", "PANTS", "WAIST", "SHOES"];
const RIGHT_EQUIP_SLOT_IDS = [
  "WRIST",
  "AMULET",
  "SUPPORT",
  "RING",
  "EARRING",
  "MAGIC_STON",
];

function itemIdChangeHandler(itemId: string) {
  return EpicItems.find((v) => v.itemId === itemId)?.itemName;
}

export default function WearItem({
  wearItem,
  resetWearItem,
  toggleWearItem,
  hoveredConcept,
}: Props) {
  const router = useRouter();
  const { server, characterid } = router.query;

  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);

  const leftEquip = Object.entries(wearItem)
    .filter(([key]) => LEFT_EQUIP_SLOT_IDS.includes(key))
    .map(([key, value]) => {
      return { slotId: key, itemId: value };
    });

  const rightEquip = Object.entries(wearItem)
    .filter(([key]) => RIGHT_EQUIP_SLOT_IDS.includes(key))
    .map(([key, value]) => {
      return { slotId: key, itemId: value };
    });

  console.log(hoveredConcept);

  return (
    <Box
      display="flex"
      backgroundImage="url('/images/bg_char.jpeg')"
      backgroundRepeat="no-repeat"
      backgroundSize="100% 85%"
      justifyContent="space-around"
      position="relative"
      width="40%"
      height="350px"
    >
      <Button
        onClick={resetWearItem}
        colorScheme="blue"
        position="absolute"
        left="0"
        zIndex="1"
      >
        초기화 버튼
      </Button>

      {data && (
        <Box position="absolute" width="100%" height="75%" bottom="15%">
          <Image
            src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${characterid}?zoom=3`}
            alt="epicinfo characterImage"
            layout="fill"
          />
        </Box>
      )}
      {leftEquip && (
        <Box
          display="flex"
          width="80px"
          flexWrap="wrap"
          alignContent="flex-start"
          marginTop="50px"
        >
          {leftEquip.map(({ slotId, itemId }, idx) => (
            <EpicItemToolTip
              key={`${itemId}, ${slotId}`}
              itemName={itemIdChangeHandler(itemId)}
            >
              <Box
                position="relative"
                onClick={() => {
                  toggleWearItem(slotId);
                }}
                border={
                  hoveredConcept.findIndex((c) => c.itemId === itemId) > -1
                    ? "2px solid gold"
                    : ""
                }
                width={"40px"}
                height={"40px"}
              >
                <Image
                  src={
                    itemId
                      ? `https://img-api.neople.co.kr/df/items/${itemId}`
                      : `/images/emptySlot/${LEFT_EQUIP_SLOT_IDS[idx]}.png`
                  }
                  alt={`에픽아이템 ${slotId}`}
                  layout="fill"
                />
              </Box>
            </EpicItemToolTip>
          ))}
        </Box>
      )}
      {rightEquip && (
        <Box
          display="flex"
          width="80px"
          flexWrap="wrap"
          alignContent="flex-start"
          marginTop="50px"
        >
          {rightEquip.map(({ slotId, itemId }, idx) => (
            <EpicItemToolTip
              key={`${itemId}, ${slotId}`}
              itemName={itemIdChangeHandler(itemId)}
            >
              <Box
                position="relative"
                onClick={() => {
                  toggleWearItem(slotId);
                }}
                border={
                  hoveredConcept.findIndex((c) => c.itemId === itemId) > -1
                    ? "2px solid gold"
                    : ""
                }
                width={"40px"}
                height={"40px"}
              >
                <Image
                  src={
                    itemId
                      ? `https://img-api.neople.co.kr/df/items/${itemId}`
                      : `/images/emptySlot/${RIGHT_EQUIP_SLOT_IDS[idx]}.png`
                  }
                  alt={`에픽아이템 ${itemId}`}
                  layout="fill"
                />
              </Box>
            </EpicItemToolTip>
          ))}
        </Box>
      )}
      {data ? (
        <Box position="absolute" bottom="0" textAlign="center">
          <Box fontWeight="700">{data.characterName}</Box>
          <Box>
            Lv.{data.level} / {data.jobGrowName} /{" "}
            {SERVER_LIST[server as keyof typeof SERVER_LIST]}
          </Box>
          {/* <Box background="gray.400">모험단 : {data.adventureName}</Box> */}
        </Box>
      ) : null}
    </Box>
  );
}

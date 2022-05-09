import { Box, Button } from "@chakra-ui/react";
import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

import EpicItemToolTip from "../Setting/EpicItemToolTip";

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

  return (
    <Box display="flex">
      <Button onClick={resetWearItem} colorScheme="blue">
        초기화 버튼
      </Button>
      <Box
        display="flex"
        backgroundImage="url('/images/bg_char.jpeg')"
        backgroundRepeat="no-repeat"
        backgroundSize="100% 90%"
        justifyContent="space-around"
        position="relative"
        width="300px"
      >
        {leftEquip && (
          <Box
            display="flex"
            width="80px"
            flexWrap="wrap"
            alignContent="flex-start"
            marginTop="10px"
          >
            {leftEquip.map(({ slotId, itemId }) => (
              <EpicItemToolTip
                key={`${itemId}, ${slotId}`}
                itemName={itemIdChangeHandler(itemId)}
              >
                <Box
                  onClick={() => {
                    toggleWearItem(slotId);
                  }}
                >
                  <Image
                    src={
                      itemId
                        ? `https://img-api.neople.co.kr/df/items/${itemId}`
                        : `/images/white-g2c278791b_640.jpg`
                    }
                    alt={`에픽아이템 ${slotId}`}
                    width={"40px"}
                    height={"40px"}
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
            marginTop="10px"
          >
            {rightEquip.map(({ slotId, itemId }) => (
              <EpicItemToolTip
                key={`${itemId}, ${slotId}`}
                itemName={itemIdChangeHandler(itemId)}
              >
                <Box
                  position="relative"
                  onClick={() => {
                    toggleWearItem(slotId);
                  }}
                >
                  <Image
                    src={
                      itemId
                        ? `https://img-api.neople.co.kr/df/items/${itemId}`
                        : `/images/white-g2c278791b_640.jpg`
                    }
                    alt={`에픽아이템 ${itemId}`}
                    width={"40px"}
                    height={"40px"}
                  />
                </Box>
              </EpicItemToolTip>
            ))}
          </Box>
        )}
        <Box position="absolute" bottom="0" textAlign="center">
          <Box>{data?.adventureName}</Box>
          <Box>
            {data?.jobGrowName} / Lv.{data?.level} {data?.characterName}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

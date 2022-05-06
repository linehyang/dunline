import { Box, Tooltip } from "@chakra-ui/react";
import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import EpicItemToolTip from "./EpicItemToolTip";

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
interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
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

// function wearConcept(value: string) {
//   let concept = EpicItems.filter(({ itemId }) => itemId === value);

//   const result = concept.map(({ concepts }) => {
//     return concepts?.map((el) => {
//       return EpicConcept[el as EpicConceptKeyType];
//     });
//   });

//   return result.join();
// }

function itemIdChangeHandler(itemId: string) {
  return EpicItems.find((v) => v.itemId === itemId)?.itemName;
}

export default function WearItem({ wearItem }: Props) {
  const router = useRouter();
  const { query } = router;
  const { server, characterid } = query;

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
                <Box>
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
                <Box position="relative">
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
      </Box>
    </Box>
  );
  {
    /* {Object.entries(wearItem).map(([key, value]) => {
        return (
          <Box key={key}>
            <Box>
              {EpicInfoEquip[key as EpicInfoEquipKeyType]}
              <Tooltip
                label={
                  <HoverEpicInfo
                    itemName={
                      EpicItems.find((v) => v.itemId === value)?.itemName
                    }
                  />
                }
                fontSize="md"
              >
                <Box as="span">
                  {value && (
                    <Image
                      src={`https://img-api.neople.co.kr/df/items/${value}`}
                      alt={value}
                      width={"30px"}
                      height={"30px"}
                    />
                  )}
                  <Box as={"span"}> {wearConcept(value)}</Box>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        );
      })} */
  }
}

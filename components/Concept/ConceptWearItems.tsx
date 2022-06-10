import { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import Image from "next/image";

import { EpicInfoEquip } from "../../public/epic";
import { filterEquipItem, convertItemName } from "../../util/conceptitemUtil";
import EpicItemToolTip from "../Others/EpicItemToolTip";

type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
  equipSlot: string[];
  toggleWearItem: (slotId: string) => void;
  hoveredConcept: { itemId: string; itemName: string }[];
}

export default function ConceptWearItems({
  wearItem,
  equipSlot,
  toggleWearItem,
  hoveredConcept,
}: Props) {
  const toast = useToast();

  const equipItem = filterEquipItem(wearItem, equipSlot);
  const [notSelectedConcept, setNotSelectedConcept] = useState([
    {
      slotId: "",
      itemId: "",
    },
  ]);

  useEffect(() => {
    if (hoveredConcept) {
      const notSelected = equipItem.filter(({ itemId }) => {
        const filter = hoveredConcept.map((itemid) => {
          return itemid.itemId;
        });

        return !filter.includes(itemId);
      });

      setNotSelectedConcept(notSelected);
    } else {
      return;
    }
  }, [hoveredConcept]);

  return (
    <Box display="flex" width="90px" flexWrap="wrap" alignContent="flex-start">
      {equipItem.map(({ slotId, itemId }, idx) => (
        <EpicItemToolTip
          key={slotId ? `Equip ${itemId} ${idx}` : `Equip ${equipSlot[idx]}`}
          itemName={convertItemName(itemId)}
        >
          <Box
            position="relative"
            onClick={() => {
              toggleWearItem(slotId);
              toast({
                title: itemId
                  ? `${convertItemName(itemId)}을/를 삭제 하였습니다.`
                  : `추가하신 아이템이 없습니다.`,
                status: itemId ? "success" : "warning",
                duration: 1000,
              });
            }}
            border={
              hoveredConcept.findIndex((c) => c.itemId === itemId) > -1
                ? "2px solid #FFD065"
                : ""
            }
            opacity={
              notSelectedConcept.length - hoveredConcept.length ===
              notSelectedConcept.length
                ? "1"
                : notSelectedConcept
                    .map((notselected) => {
                      if (notselected.itemId === itemId) {
                        return notselected.itemId;
                      }
                    })
                    .includes(itemId)
                ? "0.5"
                : "1"
            }
            width="40px"
            height="40px"
            marginBottom="2px"
            marginRight="2px"
          >
            <Image
              src={
                itemId
                  ? `https://img-api.neople.co.kr/df/items/${itemId}`
                  : `/images/emptySlot/${equipSlot[idx]}.png`
              }
              alt={`에픽아이템 ${slotId}`}
              layout="fill"
              unoptimized={true}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </Box>
        </EpicItemToolTip>
      ))}
    </Box>
  );
}

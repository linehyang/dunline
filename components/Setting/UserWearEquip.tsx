import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

import EpicItemToolTip from "../Others/EpicItemToolTip";
import { UserEquipInfoType } from "../../interface/equipInfo";
import { filterInGameEquipItem } from "../../util/settingitemUtil";

interface Props {
  equipSlot: string[];
  data: UserEquipInfoType;
  conceptSelect: string[];
}

export default function UserWearEquip({
  equipSlot,
  data,
  conceptSelect,
}: Props) {
  const userEquipEpic = filterInGameEquipItem(equipSlot, data);
  const [notConceptSelect, setNotConceptSelect] = useState<string[]>([]);

  useEffect(() => {
    if (conceptSelect) {
      const notSelected = data?.equipment
        .map(({ itemName }) => {
          if (!conceptSelect.includes(itemName)) {
            return itemName;
          }
        })
        .filter(Boolean);
      setNotConceptSelect(notSelected as string[]);
    } else {
      return;
    }
  }, [conceptSelect]);

  return (
    <Box display="flex" width="90px" flexWrap="wrap" alignContent="flex-start">
      {userEquipEpic.map((equipItemInfo, idx) =>
        equipItemInfo ? (
          <EpicItemToolTip
            key={
              equipItemInfo
                ? `left ${equipItemInfo!.itemId}`
                : `left ${equipSlot[idx]} ${idx}}`
            }
            itemName={equipItemInfo!.itemName}
          >
            <Box
              position="relative"
              border={
                conceptSelect.includes(equipItemInfo.itemName)
                  ? "2px solid #FFD065"
                  : ""
              }
              opacity={
                notConceptSelect.length - conceptSelect.length ===
                notConceptSelect.length
                  ? "1"
                  : notConceptSelect.includes(equipItemInfo.itemName)
                  ? "0.5"
                  : "1"
              }
              width="40px"
              height="40px"
              marginBottom="2px"
              marginRight="2px"
            >
              <Image
                src={`https://img-api.neople.co.kr/df/items/${
                  equipItemInfo!.itemId
                }`}
                alt={`에픽아이템 ${equipItemInfo!.slotId}`}
                layout="fill"
                unoptimized={true}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </Box>
          </EpicItemToolTip>
        ) : (
          <Box
            key={`left ${equipSlot[idx]} ${idx}}`}
            position="relative"
            width="40px"
            height="40px"
            marginBottom="2px"
            marginRight="2px"
          >
            <Image
              src={`/images/emptySlot/${equipSlot[idx]}.png`}
              alt=""
              layout="fill"
              unoptimized={true}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </Box>
        )
      )}
    </Box>
  );
}

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
            />
          </Box>
        )
      )}
    </Box>
  );
}

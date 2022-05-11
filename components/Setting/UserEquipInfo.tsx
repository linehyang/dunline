import useSWR from "swr";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import EpicItemToolTip from "./EpicItemToolTip";
import UserEquipDetail from "./UserEquipDetail";
import InGameEpicConcept from "./InGameEpicConcept";

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
export default function UserEquipInfo() {
  const router = useRouter();
  const { server, characterid } = router.query;

  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);

  console.log(data);

  const leftEquip = LEFT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  );
  const rightEquip = RIGHT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  );

  if (!data) {
    return null;
  }

  console.log(leftEquip);
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
        <Box
          position="absolute"
          zIndex="1"
          width="300px"
          height="300px"
          bottom="50px"
        >
          <Image
            src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${characterid}?zoom=3`}
            alt="epicinfo characterImage"
            layout="fill"
          />
        </Box>
        {leftEquip && (
          <Box
            display="flex"
            width="80px"
            flexWrap="wrap"
            alignContent="flex-start"
            marginTop="10px"
          >
            {leftEquip.map((equipItemInfo, idx) =>
              equipItemInfo ? (
                <EpicItemToolTip
                  key={equipItemInfo!.itemId}
                  itemName={equipItemInfo!.itemName}
                >
                  <Box>
                    <Box
                      as="span"
                      position="absolute"
                      color={
                        equipItemInfo?.amplificationName ? "#DB00DB" : "#ffffff"
                      }
                      fontWeight="bold"
                      zIndex="1"
                      fontSize="12px"
                    >
                      +{equipItemInfo?.reinforce}
                    </Box>
                    <Image
                      src={`https://img-api.neople.co.kr/df/items/${
                        equipItemInfo!.itemId
                      }`}
                      alt={`에픽아이템 ${equipItemInfo!.slotId}`}
                      width={"40px"}
                      height={"40px"}
                    />
                  </Box>
                </EpicItemToolTip>
              ) : (
                <Box>
                  <Image
                    src={`/images/emptySlot/${LEFT_EQUIP_SLOT_IDS[idx]}.png`}
                    alt=""
                    width={"40px"}
                    height={"40px"}
                  />
                </Box>
              )
            )}
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
            {rightEquip.map((equipItemInfo, idx) =>
              equipItemInfo ? (
                <EpicItemToolTip
                  key={equipItemInfo!.itemId}
                  itemName={equipItemInfo!.itemName}
                >
                  <Box position="relative">
                    <Box
                      as="span"
                      position="absolute"
                      color={
                        equipItemInfo?.amplificationName ? "#DB00DB" : "#ffffff"
                      }
                      fontWeight="bold"
                      zIndex="1"
                      fontSize="12px"
                    >
                      +{equipItemInfo?.reinforce}
                    </Box>
                    <Image
                      src={`https://img-api.neople.co.kr/df/items/${
                        equipItemInfo!.itemId
                      }`}
                      alt={`에픽아이템 ${equipItemInfo!.slotId}`}
                      width={"40px"}
                      height={"40px"}
                    />
                  </Box>
                </EpicItemToolTip>
              ) : (
                <Box>
                  <Image
                    src={`/images/emptySlot/${RIGHT_EQUIP_SLOT_IDS[idx]}.png`}
                    alt=""
                    width={"40px"}
                    height={"40px"}
                  />
                </Box>
              )
            )}
          </Box>
        )}
        <Box position="absolute" bottom="0" textAlign="center">
          <Box>{data.adventureName}</Box>
          <Box>
            {data.jobGrowName} / Lv.{data.level} {data.characterName}
          </Box>
        </Box>
      </Box>
      <Box width="calc(100% - 300px)">
        <UserEquipDetail data={data} />
        <InGameEpicConcept data={data.equipment} />
      </Box>
    </Box>
  );
}

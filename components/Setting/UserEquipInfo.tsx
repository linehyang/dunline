import useSWR from "swr";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import EpicItemToolTip from "./EpicItemToolTip";
import UserEquipDetail from "./UserEquipDetail";
import InGameEpicConcept from "./InGameEpicConcept";
import { SERVER_LIST } from "../../interface/characterSearch";

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

  const [conceptSelect, setConceptSelect] = useState<string[]>([]);

  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR<UserEquipInfoType>(url);

  const leftEquip = LEFT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  );
  const rightEquip = RIGHT_EQUIP_SLOT_IDS.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  );

  if (!data) {
    return null;
  }

  return (
    <Box display="flex">
      <Box
        display="flex"
        justifyContent="space-around"
        position="relative"
        width="40%"
        backgroundColor="gray.600"
        borderRadius="20px"
      >
        <Box
          position="absolute"
          backgroundColor="gray.500"
          borderRadius="50%"
          width="80%"
          height="60%"
          top="20%"
        />
        <Box position="absolute" width="100%" height="75%" bottom="20%">
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
            marginTop="25px"
          >
            {leftEquip.map((equipItemInfo, idx) =>
              equipItemInfo ? (
                <EpicItemToolTip
                  key={equipItemInfo!.itemId}
                  itemName={equipItemInfo!.itemName}
                >
                  <Box
                    position="relative"
                    border={
                      conceptSelect.includes(equipItemInfo.itemName)
                        ? "2px solid red"
                        : ""
                    }
                    width="40px"
                    height="40px"
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
                <Box>
                  <Image
                    src={`/images/emptySlot/${LEFT_EQUIP_SLOT_IDS[idx]}.png`}
                    alt=""
                    width={"39px"}
                    height={"39px"}
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
            marginTop="25px"
          >
            {rightEquip.map((equipItemInfo, idx) =>
              equipItemInfo ? (
                <EpicItemToolTip
                  key={equipItemInfo!.itemId}
                  itemName={equipItemInfo!.itemName}
                >
                  <Box
                    position="relative"
                    border={
                      conceptSelect.includes(equipItemInfo.itemName)
                        ? "2px solid red"
                        : ""
                    }
                    width="40px"
                    height="40px"
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
                <Box>
                  <Image
                    src={`/images/emptySlot/${RIGHT_EQUIP_SLOT_IDS[idx]}.png`}
                    alt=""
                    width={"39px"}
                    height={"39px"}
                  />
                </Box>
              )
            )}
          </Box>
        )}
        <Box position="absolute" bottom="5%" textAlign="center">
          <Box fontWeight="700">{data.characterName}</Box>
          <Box>
            Level {data.level} / {data.jobGrowName} /{" "}
            {SERVER_LIST[server as keyof typeof SERVER_LIST]}
          </Box>
          <Box background="gray.400">모험단 : {data.adventureName}</Box>
        </Box>
      </Box>
      <Box width="calc(100% - 300px)">
        <UserEquipDetail data={data} />
        <InGameEpicConcept
          data={data.equipment}
          hoverWearItem={(concept) => {
            setConceptSelect(concept);
          }}
        />
      </Box>
    </Box>
  );
}

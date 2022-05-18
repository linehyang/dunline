import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import EpicItemToolTip from "../Others/EpicItemToolTip";
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

type Props = {
  data: UserEquipInfoType;
  conceptSelect: string[];
  hoverWearItem: (concept: string[]) => void;
};

//server와 characterid를 받아와 해당 캐릭터 장착 장비를 확인하는 컴포넌트
export default function UserEquipInfo({
  data,
  conceptSelect,
  hoverWearItem,
}: Props) {
  const router = useRouter();
  const { server, characterid } = router.query;

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
        flexDirection="column"
        position="relative"
        backgroundColor="#8d8d8d"
        width="50%"
        height="50vh"
        padding="55px 20px"
        minHeight="30px"
      >
        <Box
          as="span"
          position="absolute"
          top="10px"
          left="10px"
          fontSize="16px"
          borderRadius="5px"
          border="1px solid #ffffff"
          padding="1px 5px"
          textAlign="center"
        >
          {SERVER_LIST[server as keyof typeof SERVER_LIST]}
        </Box>
        <Box
          position="absolute"
          width="100%"
          height="75%"
          bottom="10%"
          left="0"
        >
          <Image
            src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${characterid}?zoom=3`}
            alt="epicinfo characterImage"
            layout="fill"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          {leftEquip && (
            <Box
              display="flex"
              width="90px"
              flexWrap="wrap"
              alignContent="flex-start"
            >
              {leftEquip.map((equipItemInfo, idx) =>
                equipItemInfo ? (
                  <EpicItemToolTip
                    key={
                      equipItemInfo
                        ? `left ${equipItemInfo!.itemId}`
                        : `left ${LEFT_EQUIP_SLOT_IDS[idx]} ${idx}}`
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
                    key={`${LEFT_EQUIP_SLOT_IDS[idx]} ${idx}}`}
                    position="relative"
                    width="40px"
                    height="40px"
                    marginBottom="2px"
                    marginRight="2px"
                  >
                    <Image
                      src={`/images/emptySlot/${LEFT_EQUIP_SLOT_IDS[idx]}.png`}
                      alt=""
                      layout="fill"
                    />
                  </Box>
                )
              )}
            </Box>
          )}
          {rightEquip && (
            <Box
              display="flex"
              width="90px"
              flexWrap="wrap"
              alignContent="flex-start"
            >
              {rightEquip.map((equipItemInfo, idx) =>
                equipItemInfo ? (
                  <EpicItemToolTip
                    key={
                      equipItemInfo
                        ? `right ${equipItemInfo!.itemId}`
                        : `right ${RIGHT_EQUIP_SLOT_IDS[idx]} `
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
                    key={`${RIGHT_EQUIP_SLOT_IDS[idx]} ${idx}}`}
                    position="relative"
                    width="40px"
                    height="40px"
                    marginBottom="2px"
                    marginRight="2px"
                  >
                    <Image
                      src={`/images/emptySlot/${RIGHT_EQUIP_SLOT_IDS[idx]}.png`}
                      alt=""
                      layout="fill"
                    />
                  </Box>
                )
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex="1"
        padding="4px 25px"
      >
        <Box>
          <Box
            color="#000000"
            backgroundColor="#ffffff"
            borderRadius="5px"
            border="1px solid #FFFFFF"
            width="52px"
            height="24px"
            textAlign="center"
            fontSize="16px"
            fontWeight="500"
          >
            {data.adventureName}
          </Box>
          <Box
            color="#F96539"
            marginTop="15px"
            fontSize="24px"
            fontWeight="500"
            lineHeight="29px"
          >
            Level {data.level}
          </Box>
          <Box fontSize="30px" fontWeight="700" lineHeight="36px">
            {data.characterName}
          </Box>
          <Box fontSize="24px" fontWeight="400" opacity="0.7" lineHeight="29px">
            {data.jobGrowName}
          </Box>
        </Box>
        <InGameEpicConcept
          data={data.equipment}
          hoverWearItem={hoverWearItem}
        />
      </Box>
    </Box>
  );
}

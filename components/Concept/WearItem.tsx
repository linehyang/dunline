import { Box, Button, useToast, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "@emotion/styled";
import { GrPowerReset } from "react-icons/gr";

import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";
import EpicItemToolTip from "../Others/EpicItemToolTip";
import { SERVER_LIST } from "../../interface/characterSearch";
import EquipEpicConcept from "../Concept/EquipEpicConcept";

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
  hoverWearItem: (concept: { itemId: string; itemName: string }[]) => void;
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
  hoverWearItem,
}: Props) {
  const router = useRouter();
  const { server, characterid } = router.query;
  const toast = useToast();

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
    <ResponsiveBox display="flex">
      <ResponsiveWearBox
        display="flex"
        flexDirection="column"
        position="relative"
        backgroundColor="#8d8d8d"
        width="50%"
        height="50vh"
        padding="55px 20px"
        minHeight="30px"
      >
        {data ? (
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
        ) : null}
        <IconButton
          icon={<GrPowerReset />}
          aria-label="컨셉 에픽 초기화 버튼"
          position="absolute"
          onClick={() => {
            resetWearItem();
            toast({
              title: `추가된 모든 장비를 초기화 하였습니다.`,
              status: "success",
              duration: 1000,
            });
          }}
          colorScheme="gray"
          right="10px"
          top="5px"
          fontSize="20px"
        >
          초기화 버튼
        </IconButton>
        {data && (
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
        )}
        <Box display="flex" justifyContent="space-between">
          {leftEquip && (
            <Box
              display="flex"
              width="90px"
              flexWrap="wrap"
              alignContent="flex-start"
            >
              {leftEquip.map(({ slotId, itemId }, idx) => (
                <EpicItemToolTip
                  key={
                    slotId
                      ? `leftEquip ${itemId} ${idx}`
                      : `leftEquip ${LEFT_EQUIP_SLOT_IDS[idx]}`
                  }
                  itemName={itemIdChangeHandler(itemId)}
                >
                  <Box
                    position="relative"
                    onClick={() => {
                      toggleWearItem(slotId);
                      toast({
                        title: itemId
                          ? `${itemIdChangeHandler(
                              itemId
                            )}을/를 삭제 하였습니다.`
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
                    width="40px"
                    height="40px"
                    marginBottom="2px"
                    marginRight="2px"
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
              width="90px"
              flexWrap="wrap"
              alignContent="flex-start"
            >
              {rightEquip.map(({ slotId, itemId }, idx) => (
                <EpicItemToolTip
                  key={
                    slotId
                      ? `rightEquip ${itemId} ${idx}`
                      : `rightEquip ${RIGHT_EQUIP_SLOT_IDS[idx]} `
                  }
                  itemName={itemIdChangeHandler(itemId)}
                >
                  <Box
                    position="relative"
                    onClick={() => {
                      toggleWearItem(slotId);
                      toast({
                        title: itemId
                          ? `${itemIdChangeHandler(
                              itemId
                            )}을/를 삭제 하였습니다.`
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
                    width="40px"
                    height="40px"
                    marginBottom="2px"
                    marginRight="2px"
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
        </Box>
      </ResponsiveWearBox>
      <ResponsiveTextBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex="1"
        padding="4px 25px"
      >
        {data ? (
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
            >
              {data.characterName}
            </Box>
            <Box
              color="#F96539"
              marginTop="15px"
              fontSize="24px"
              fontWeight="500"
              lineHeight="29px"
            >
              Lv.{data.level}
            </Box>
            <Box fontSize="30px" fontWeight="700" lineHeight="36px">
              {data.characterName}
            </Box>
            <Box
              fontSize="24px"
              fontWeight="400"
              opacity="0.7"
              lineHeight="29px"
            >
              {data.jobGrowName}
            </Box>
          </Box>
        ) : (
          <Box wordBreak="keep-all">
            캐릭터명을 검색해서 접근하지 않았으므로 득템현황은 확인이
            불가합니다.
          </Box>
        )}
        <EquipEpicConcept wearItem={wearItem} hoverWearItem={hoverWearItem} />
      </ResponsiveTextBox>
    </ResponsiveBox>
  );
}

const ResponsiveBox = styled(Box)`
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`;

const ResponsiveWearBox = styled(Box)`
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ResponsiveTextBox = styled(Box)`
  @media (max-width: 576px) {
    padding: 0;
    margin-top: 20px;
  }
`;

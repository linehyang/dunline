import { Box, useToast, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { GrPowerReset } from "react-icons/gr";

import { EpicInfoEquip } from "../../data/epic";
import { SERVER_LIST } from "../../interface/characterSearch";
import EquipEpicConcept from "../Concept/EquipEpicConcept";
import { UserEquipInfoType } from "../../interface/equipInfo";

import ConceptWearItems from "./ConceptWearItems";

type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
  resetWearItem: () => void;
  toggleWearItem: (slotId: string) => void;
  hoveredConcept: { itemId: string; itemName: string }[];
  hoverWearItem: (concept: { itemId: string; itemName: string }[]) => void;
  data: UserEquipInfoType;
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

export default function WearItem({
  wearItem,
  resetWearItem,
  toggleWearItem,
  hoveredConcept,
  hoverWearItem,
  data,
}: Props) {
  const router = useRouter();
  const { server, characterid } = router.query;
  const toast = useToast();

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
          aria-label="?????? ?????? ????????? ??????"
          position="absolute"
          onClick={() => {
            resetWearItem();
            toast({
              title: `????????? ?????? ????????? ????????? ???????????????.`,
              status: "success",
              duration: 1000,
            });
          }}
          colorScheme="gray"
          right="10px"
          top="5px"
          fontSize="20px"
        >
          ????????? ??????
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
              unoptimized={true}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          {leftEquip && (
            <ConceptWearItems
              wearItem={wearItem}
              toggleWearItem={toggleWearItem}
              hoveredConcept={hoveredConcept}
              equipSlot={LEFT_EQUIP_SLOT_IDS}
            />
          )}
          {rightEquip && (
            <ConceptWearItems
              wearItem={wearItem}
              toggleWearItem={toggleWearItem}
              hoveredConcept={hoveredConcept}
              equipSlot={RIGHT_EQUIP_SLOT_IDS}
            />
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
              {data.adventureName}
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
            ??????????????? ???????????? ???????????? ??????????????? ??????????????? ?????????
            ???????????????.
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

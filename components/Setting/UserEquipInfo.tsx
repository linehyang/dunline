import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import InGameEpicConcept from "./InGameEpicConcept";
import { SERVER_LIST } from "../../interface/characterSearch";
import { UserEquipInfoType } from "../../interface/equipInfo";
import UserWearEquip from "./UserWearEquip";

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

interface Props {
  data: UserEquipInfoType;
  conceptSelect: string[];
  hoverWearItem: (concept: string[]) => void;
}

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
            <UserWearEquip
              data={data}
              equipSlot={LEFT_EQUIP_SLOT_IDS}
              conceptSelect={conceptSelect}
            />
          )}
          {rightEquip && (
            <UserWearEquip
              data={data}
              equipSlot={RIGHT_EQUIP_SLOT_IDS}
              conceptSelect={conceptSelect}
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

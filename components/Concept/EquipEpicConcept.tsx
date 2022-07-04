import { Box, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { EpicInfoEquip, EpicItems, EpicConcept } from "../../data/epic";

interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
  hoverWearItem: (concept: { itemId: string; itemName: string }[]) => void;
}

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

export default function EquipEpicConcept({ wearItem, hoverWearItem }: Props) {
  const checkedWearItems = Object.values(wearItem).filter(Boolean);

  const wearItemByConcept = EpicItems.filter(({ itemId }) =>
    checkedWearItems.includes(itemId)
  ).reduce((acc, epicItem) => {
    const { concepts = [], itemId, itemName } = epicItem;

    if (concepts.length < 1) {
      return acc;
    }

    concepts.forEach((concept) => {
      Array.isArray(acc[concept])
        ? (acc[concept] = [...acc[concept], { itemId, itemName }])
        : (acc[concept] = [{ itemId, itemName }]);
    });

    return acc;
  }, {} as { [key: string]: { itemId: string; itemName: string }[] });

  if (!checkedWearItems.length) {
    return (
      <NotSelctConceptBox
        display="flex"
        flexWrap="wrap"
        color="#FFD065"
        marginBottom="100px"
      >
        선택된 컨셉과 에픽이 없습니다.
      </NotSelctConceptBox>
    );
  }

  return (
    <StyledBox display="flex" flexWrap="wrap" color="#FFD065">
      {Object.keys(wearItemByConcept).map((conceptName, idx) => {
        return (
          <Box
            key={conceptName ? `concept ${conceptName} ` : `concept ${idx}`}
            onMouseOver={() => {
              hoverWearItem(wearItemByConcept[conceptName]);
            }}
            onMouseOut={() => {
              hoverWearItem([]);
            }}
            _hover={{
              backgroundColor: "#FFD065",
              color: "#000000",
            }}
            border=" 1px solid #FFD065"
            borderRadius="25px"
            padding="3px 15px"
            marginBottom="4px"
          >
            <Tooltip
              label={
                <Box as="ul">
                  {wearItemByConcept[conceptName].map(({ itemName }, idx) => (
                    <Box
                      as="li"
                      key={itemName ? `Equip1 ${itemName}` : `Equip1 ${idx}`}
                    >
                      {itemName}
                    </Box>
                  ))}
                </Box>
              }
              fontSize="md"
            >
              {`#${EpicConcept[conceptName as EpicConceptKeyType]}(${
                wearItemByConcept[conceptName].length
              })`}
            </Tooltip>
          </Box>
        );
      })}
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
  & > :not(:last-child) {
    margin-right: 10px;
  }
  @media (max-width: 576px) {
    margin-top: 30px;
  }
`;

const NotSelctConceptBox = styled(Box)`
  @media (max-width: 576px) {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

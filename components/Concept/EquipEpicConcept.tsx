import { Box, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";

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
      <Box display="flex" flexWrap="wrap" flex="1">
        선택된 에픽이 없습니다 에픽을 선택해주세요
      </Box>
    );
  }

  console.log(wearItemByConcept);

  return (
    <StyledBox display="flex" flexWrap="wrap" flex="1" height="1rem">
      {Object.keys(wearItemByConcept).map((conceptName) => {
        return (
          <Box
            key={conceptName}
            onMouseOver={() => {
              hoverWearItem(wearItemByConcept[conceptName]);
            }}
            onMouseOut={() => {
              hoverWearItem([]);
            }}
          >
            <Tooltip
              label={
                <Box as="ul">
                  {wearItemByConcept[conceptName].map(({ itemName }) => (
                    <Box as="li" key={itemName}>
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
`;

import { Box, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";

interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
}

type EpicConceptKeyType = keyof typeof EpicConcept;
type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

export default function EquipEpicConcept({ wearItem }: Props) {
  const check = Object.values(wearItem).filter(Boolean);

  const wearItemByConcept = EpicItems.filter(({ itemId }) =>
    check.includes(itemId)
  ).reduce((acc, epicItem) => {
    const concepts = epicItem.concepts ?? [];

    if (concepts.length < 1) {
      return acc;
    }

    concepts.forEach((concept) => {
      Array.isArray(acc[concept])
        ? (acc[concept] = [...acc[concept], epicItem.itemName])
        : (acc[concept] = [epicItem.itemName]);
    });

    return acc;
  }, {} as { [key: string]: string[] });

  if (!check.length) {
    return <Box>선택된 에픽이 없습니다 에픽을 선택해주세요</Box>;
  }

  return (
    <StyledBox display="flex" flexWrap="wrap">
      {Object.keys(wearItemByConcept).map((conceptName) => {
        return (
          <Box key={conceptName}>
            <Tooltip
              label={
                <Box as="ul">
                  {wearItemByConcept[conceptName].map((item) => (
                    <Box as="li" key={item}>
                      {item}
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

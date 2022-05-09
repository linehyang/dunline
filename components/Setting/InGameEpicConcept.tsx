import { Box, Tooltip } from "@chakra-ui/react";

import { EpicItems, EpicConcept } from "../../public/epic";
import styled from "@emotion/styled";

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

type EpicConceptKeyType = keyof typeof EpicConcept;

type Props = {
  data: EquipmentType[];
};

export default function InGameEpicConcept({ data }: Props) {
  const itemNameRecord: Record<string, string> = data.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.itemName]: cur.itemName,
    };
  }, {});

  const ingameEpicItemsByConcept = EpicItems.filter(
    (item) => itemNameRecord[item.itemName]
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

  return (
    <StyledBox display="flex" flexWrap="wrap">
      {Object.keys(ingameEpicItemsByConcept).map((conceptName) => {
        return (
          <Box key={conceptName}>
            <Tooltip
              label={
                <Box as="ul">
                  {ingameEpicItemsByConcept[conceptName].map((item) => (
                    <Box as="li" key={item}>
                      {item}
                    </Box>
                  ))}
                </Box>
              }
              fontSize="md"
            >
              {`#${EpicConcept[conceptName as EpicConceptKeyType]}(${
                ingameEpicItemsByConcept[conceptName].length
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
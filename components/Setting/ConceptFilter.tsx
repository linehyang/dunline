import { Tag, TagLabel, Box } from "@chakra-ui/react";

import React from "react";
import { EpicConcept } from "../../public/epicConcept";

type EpicConceptKeyType = keyof typeof EpicConcept;

interface Props {
  concepts: EpicConceptKeyType[];
  onClick: (key: EpicConceptKeyType) => void;
}

export default function ConceptFilter({ concepts, onClick }: Props) {
  return (
    <Box>
      {Object.entries(EpicConcept).map(([key, value]) => (
        <Tag
          size={"sm"}
          key={key}
          variant="subtle"
          colorScheme={
            concepts.includes(key as EpicConceptKeyType) ? "gray" : "green"
          }
        >
          <TagLabel
            onClick={() => {
              onClick(key as EpicConceptKeyType);
            }}
          >
            {value}
          </TagLabel>
        </Tag>
      ))}
    </Box>
  );
}

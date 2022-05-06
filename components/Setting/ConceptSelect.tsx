import { Box } from "@chakra-ui/react";
import Select from "react-select";

import { EpicConcept } from "../../public/epic";

type EpicConceptKeyType = keyof typeof EpicConcept;
export type ConceptSelectOptionValue = {
  value: EpicConceptKeyType;
  label: string;
};

type Props = {
  onChange: (concept: ConceptSelectOptionValue[]) => void;
};

export default function ConceptSelect({ onChange }: Props) {
  const selectCustomStyles = {
    menu: () => ({
      borderBottom: "1px dotted pink",
      background: "#eeeeee",
      color: "gray",
    }),
  };

  const options = Object.entries(EpicConcept).map(([epicId, epicName]) => ({
    value: epicId as EpicConceptKeyType,
    label: epicName,
  }));

  return (
    <Box width={"500px"}>
      <Select
        styles={selectCustomStyles}
        options={options}
        closeMenuOnSelect={false}
        onChange={(concept) => {
          onChange(concept as ConceptSelectOptionValue[]);
        }}
        placeholder={`원하는 컨셉을 선택해주세요`}
        noOptionsMessage={() => "검색하신 컨셉은 존재하지 않습니다"}
        isMulti
      />
    </Box>
  );
}

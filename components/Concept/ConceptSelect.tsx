import { Box } from "@chakra-ui/react";
import Select from "react-select";

import { EpicConcept } from "../../public/epic";

import type { StylesConfig } from "react-select";

type EpicConceptKeyType = keyof typeof EpicConcept;
export type ConceptSelectOptionValue = {
  value: EpicConceptKeyType;
  label: string;
};

type Props = {
  onChange: (concept: ConceptSelectOptionValue[]) => void;
};

export default function ConceptSelect({ onChange }: Props) {
  const selectCustomStyles: StylesConfig = {
    input: (base) => ({
      ...base,
      color: "#ffffff",
    }),

    control: (base) => ({
      ...base,
      background: "#000000",
      borderRadius: "25px",
      borderColor: "#ffffff",
      "&:hover": {
        borderColor: "none",
      },
      padding: "0 0 0 5px",
      color: "#8D8D8D",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      background: "#ffffff",
      color: "#000000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
      fontWeight: "600",
    }),
    multiValue: (base) => ({
      ...base,
      background: "#8d8d8d",
      borderRadius: "25px",
      padding: "0 8px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#212529",
      background: "#8d8d8d",
      borderRadius: "25px",
      "&:hover": {
        color: "#212529",
        background: "#8d8d8d",
      },
    }),
  };

  const options = Object.entries(EpicConcept).map(([epicId, epicName]) => ({
    value: epicId as EpicConceptKeyType,
    label: epicName,
  }));

  return (
    <Box width="100%" marginTop="50px">
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

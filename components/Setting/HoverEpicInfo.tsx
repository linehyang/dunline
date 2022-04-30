import { Box } from "@chakra-ui/react";

import { EpicItems } from "../../public/epic";

interface Props {
  itemName: string;
}

export default function HoverEpicInfo({ itemName }: Props) {
  const epicItem = EpicItems.find((item) => item.itemName === itemName);

  if (!epicItem) {
    return null;
  }
  return (
    <>
      <Box>{epicItem.itemName}</Box>
      {epicItem.options.map((option, index) => (
        <Box key={`HoverEpicInfo-${index.toString()}`}>
          {`${index + 1}옵션 : ${option}`}
        </Box>
      ))}
    </>
  );
}

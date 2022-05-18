import { Box } from "@chakra-ui/react";

import { EpicItems } from "../../public/epic";

interface Props {
  itemName: string | undefined;
}

export default function HoverEpicInfo({ itemName }: Props) {
  const epicItem = EpicItems.find((item) => item.itemName === itemName);

  if (!epicItem) {
    return null;
  }
  return (
    <>
      <Box fontWeight="700">{epicItem.itemName}</Box>
      {epicItem.options.map((option, index) => (
        <Box key={`HoverEpicInfo-${index.toString()}`} marginTop="10px">
          <Box
            as="span"
            fontSize="sm"
            backgroundColor="gray"
            borderRadius="4px"
            padding="3px"
          >
            {`${index + 1}옵션`}
          </Box>
          <Box fontSize="xs" marginTop="10px" wordBreak="keep-all">
            {option}
          </Box>
        </Box>
      ))}
    </>
  );
}

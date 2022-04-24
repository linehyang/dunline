import { Box } from "@chakra-ui/react";

import { EpicDetail } from "../../public/epicDetail";

interface Props {
  itemId: string;
}

export default function HoverEpicInfo({ itemId }: Props) {
  let result = EpicDetail[itemId as keyof typeof EpicDetail];

  return (
    <>
      <Box>{result[0]}</Box>
      <Box>1옵션 : {result[1]}</Box>
      <Box>2옵션 : {result[2]}</Box>
      <Box>3옵션 : {result[3]}</Box>
      <Box>4옵션 : {result[4]}</Box>
    </>
  );
}

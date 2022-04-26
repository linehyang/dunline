import { Box } from "@chakra-ui/react";

import { EpicItems } from "../../public/epic";

interface Props {
  itemId: string;
}

export default function HoverEpicInfo({ itemId }: Props) {
  let name = EpicItems.filter((item) => item.itemId === itemId).map(
    ({ itemName }) => {
      return itemName;
    }
  );

  let option = EpicItems.filter((item) => item.itemId === itemId).map(
    ({ options }) => {
      return options;
    }
  );

  return (
    <>
      {name[0] && option && (
        <>
          <Box>{name.join()}</Box>
          <Box>1옵션 : {option[0][0]}</Box>
          <Box>2옵션 : {option[0][1]}</Box>
          <Box>3옵션 : {option[0][2]}</Box>
          <Box>4옵션 : {option[0][3]}</Box>
        </>
      )}
    </>
  );
}

import { Box, Tooltip } from "@chakra-ui/react";
import { EpicInfoEquip, EpicItems, EpicConcept } from "../../public/epic";
import Image from "next/image";

import HoverEpicInfo from "./HoverEpicInfo";

type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;
type EpicConceptKeyType = keyof typeof EpicConcept;
interface Props {
  wearItem: Record<EpicInfoEquipKeyType, string>;
}

function wearConcept(value: string) {
  let concept = EpicItems.filter(({ itemId }) => itemId === value);

  const result = concept.map(({ concepts }) => {
    return concepts?.map((el) => {
      return EpicConcept[el as EpicConceptKeyType];
    });
  });

  return result.join();
}

export default function WearItem({ wearItem }: Props) {
  return (
    <>
      <Box>에픽 아이템 장착</Box>
      {Object.entries(wearItem).map(([key, value]) => {
        return (
          <Box key={key}>
            <Box>
              {EpicInfoEquip[key as EpicInfoEquipKeyType]}
              <Tooltip label={<HoverEpicInfo itemId={value} />} fontSize="md">
                <Box as="span">
                  {value && (
                    <Image
                      src={`https://img-api.neople.co.kr/df/items/${value}`}
                      alt={value}
                      width={"30px"}
                      height={"30px"}
                    />
                  )}
                  <Box as={"span"}> {wearConcept(value)}</Box>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

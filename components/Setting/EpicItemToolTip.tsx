import { Tooltip } from "@chakra-ui/react";

import HoverEpicInfo from "./HoverEpicInfo";

import type { ReactNode } from "react";

type Props = {
  itemName?: string | undefined;
  children: ReactNode;
};

export default function EpicItemToolTip({ itemName, children }: Props) {
  return (
    <Tooltip
      label={itemName ? <HoverEpicInfo itemName={itemName} /> : null}
      fontSize="md"
    >
      {children}
    </Tooltip>
  );
}

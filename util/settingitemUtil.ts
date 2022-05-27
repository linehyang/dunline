import { UserEquipInfoType } from "../interface/equipInfo";

export function filterInGameEquipItem(
  equipSlot: string[],
  data: UserEquipInfoType
) {
  return equipSlot.map((slotId) =>
    data?.equipment.find((v) => v.slotId === slotId)
  );
}

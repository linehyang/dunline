import { EpicInfoEquip, EpicItems } from "../data/epic";

type EpicInfoEquipKeyType = keyof typeof EpicInfoEquip;

export function filterEquipItem(
  wearItem: Record<EpicInfoEquipKeyType, string>,
  equipSlot: string[]
) {
  return Object.entries(wearItem)
    .filter(([key]) => equipSlot.includes(key))
    .map(([key, value]) => {
      return { slotId: key, itemId: value };
    });
}

export function convertItemName(itemId: string) {
  return EpicItems.find((v) => v.itemId === itemId)?.itemName;
}

export function convertItemId(itemName: string) {
  return EpicItems.find((v) => v.itemName === itemName)?.itemId;
}

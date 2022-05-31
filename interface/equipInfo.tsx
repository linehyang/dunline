export interface EquipmentType {
  amplificationName: string;
  enchant: {
    explain?: string;
    status?: {
      name: string;
      value: number;
    };
  };
  growInfo?: {
    options?: GrowInfoType[];
    total?: {
      damage: number;
      buff: number;
    };
  };
  itemAvailableLevel: number;
  itemGradeName: string;
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemType: string;
  itemTypeDetail: string;
  refine: number;
  reinforce: number;
  slotId: string;
  slotName: string;
}

export interface UserEquipInfoType {
  adventureName: string;
  characterId: string;
  characterName: string;
  equipment: EquipmentType[];
  guildId: string;
  guildName: string;
  jobGrowId: string;
  jobGrowName: string;
  jobId: string;
  jobName: string;
  level: number;
}
export interface GrowInfoType {
  level: number;
  expRate: number;
  explain: string;
  explainDetail: string;
  damage: number;
}

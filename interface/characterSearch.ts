export enum SERVER_LIST {
  all = "전체",
  cain = "카인",
  diregie = "디레지에",
  siroco = "시로코",
  prey = "프레이",
  casillas = "카시야스",
  hilder = "힐더",
  anton = "안톤",
  bakal = "바칼",
}

//객체들의 key만 뽑아오기 위해 keyof를 사용
export type ServerKeyType = keyof typeof SERVER_LIST;

export interface CharacterSearch {
  serverId: ServerKeyType;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
}

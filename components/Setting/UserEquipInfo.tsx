import useSWR from "swr";

type Props = {
  server: string | string[] | undefined;
  characterid: string | string[] | undefined;
};

//server와 characterid를 받아와 해당 캐릭터 장착 장비를 확인하는 컴포넌트
function UserEquipInfo({ server, characterid }: Props) {
  const url = `api/userEquipInfo?server=${server}&characterid=${characterid}`;

  const { data } = useSWR(url);
  console.log(data);

  return <div>123</div>;
}

export default UserEquipInfo;

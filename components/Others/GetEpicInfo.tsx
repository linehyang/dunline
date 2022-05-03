import useSWR from "swr";

//에픽 정보를 가져오기 위한 컴포넌트 실제로 사용되지는 않음. 1~4옵션까지
export default function GetEpicInfo() {
  const url = `/api/epic`;

  const { data } = useSWR(url);
  console.log(data);

  return <div>123</div>;
}

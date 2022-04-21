import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

import UserEquipInfo from "../components/Setting/UserEquipInfo";

function Setting() {
  const router = useRouter();
  const { query } = router;
  const { server, characterid } = query;

  const url = `/api/currentStateEpic?server=${server}&characterid=${characterid}`;

  const { data } = useSWR(url);

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <main>
        <UserEquipInfo server={server} characterid={characterid} />
        <div>내가 먹은 에픽 현황</div>
        <div>{characterid}</div>
        <div>{server}</div>
        {data
          ? data.map((el: any, index: string) => {
              return (
                <div key={index}>
                  <Image
                    src={`https://img-api.neople.co.kr/df/items/${el.data.itemId}`}
                    alt={el.data.itemName}
                    width={30}
                    height={30}
                  />
                  index : {index} / 획득일 : {el.date} <br />
                  {`"${el.data.itemId}" : "${el.data.itemName}"`}
                </div>
              );
            })
          : null}
      </main>
    </>
  );
}

export default Setting;

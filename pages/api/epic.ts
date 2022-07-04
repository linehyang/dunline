// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { shinwha } from "../../public/epicInfo";

const ENDPOINT = "https://api.neople.co.kr/df";
const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;

type dataType = {
  rows: [
    {
      itemId: string;
      itemName: string;
      itemRarity: string;
      itemType: string;
      itemTypeDetail: string;
      itemAvailableLevel: number;
    }
  ];
};

type itemDetailType = {
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemType: string;
  itemTypeDetail: string;
  itemAvailableLevel: number;
  itemObtainInfo: string;
  itemExplain: string;
  itemExplainDetail: string;
  itemFlavorText: string;
  setItemId: string;
  setItemName: string;
  mythologyInfo: { options: [[Object], [Object], [Object], [Object]] };
  itemBuff: {
    explain: string;
    explainDetail: string;
    reinforceSkill: [[Object], [Object], [Object]];
  };
  hashtag: [];
};

//에픽 정보를 가져오기 위한 api route  Epic
// EpicDetail.tsx 컴포넌트와 연동해서 사용가능
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 방법 1.
  // const results = [];
  // for await (const shinwhaItem of shinwha) {
  //   const itemInfoResponse = await fetch(
  //     `${ENDPOINT}/items?itemName=${encodeURIComponent(shinwhaItem)}`,
  //     {
  //       headers: {
  //         apiKey: API_KEY ?? "",
  //       },
  //     }
  //   );
  //   const itemInfo = await itemInfoResponse.json();
  //   const itemId = itemInfo.rows[0].itemId;
  //   const item = await fetch(`${ENDPOINT}/items/${itemId}`, {
  //     headers: {
  //       apiKey: API_KEY ?? "",
  //     },
  //   });
  //   results.push(await item.json());
  // }
  // 방법 2.
  // const itemIds = await Promise.all(
  //   shinwha.map((shin) =>
  //     fetch(`${ENDPOINT}/items?itemName=${encodeURIComponent(shin)}`, {
  //       headers: {
  //         apiKey: API_KEY ?? "",
  //       },
  //     })
  //   )
  // ).then((responses) => {
  //   return Promise.all(
  //     responses.map((response) => {
  //       return response.json().then((p) => {
  //         p.rows[0].itemId;
  //       });
  //     })
  //   );
  // });
  // const results = await Promise.all(
  //   itemIds.map((itemId) =>
  //     fetch(`${ENDPOINT}/items/${itemId}`, {
  //       headers: {
  //         apiKey: API_KEY ?? "",
  //       },
  //     }).then((response) => response.json())
  //   )
  // );
  // res.status(200).json(results);
}

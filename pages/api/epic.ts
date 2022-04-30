// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { EpicInfo } from "../../public/epicInfo";

const ENDPOINT = "https://api.neople.co.kr/df";
const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const EPIC_PART = "EARRING";

//에픽 정보를 가져오기 위한 api route  Epic
// EpicDetail.tsx 컴포넌트와 연동해서 사용가능
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = EpicInfo[EPIC_PART];
  let result = [];

  try {
    for (const key of Object.keys(itemId)) {
      const url = `${ENDPOINT}/items/${key}`;
      const response = await fetch(url, {
        headers: {
          apiKey: API_KEY ?? "",
        },
      });

      if (!response.ok) {
        return res.status(response.status);
      }

      const data = await response.json();
      result.push([
        data.itemName,
        data.growInfo,
        data.itemId,
        data.itemObtainInfo,
      ]);
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500);
  }

  //
}

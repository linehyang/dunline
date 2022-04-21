// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const ENDPOINT = "https://api.neople.co.kr/df";

const reqUrl = ({
  server,
  characterid,
}: {
  server: string;
  characterid: string;
}) => {
  return `${ENDPOINT}/servers/${server}/characters/${characterid}/equip/equipment`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { server, characterid } = req.query;

  const url = reqUrl({
    server: server.toString(),
    characterid: characterid.toString(),
  });

  try {
    const response = await fetch(url, {
      headers: {
        apiKey: API_KEY ?? "",
      },
    });

    if (!response.ok) {
      return res.status(response.status);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500);
  }
}

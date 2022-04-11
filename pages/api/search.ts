// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CharacterSearch } from "../../types/characterSearch";

const api = process.env.NEXT_PUBLIC_DF_APIKEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { serverSelect, characterName } = req.query;
  console.log(req.query);
  console.log(serverSelect);

  const url = `https://api.neople.co.kr/df/servers/${serverSelect}/characters?characterName=${characterName}&limit=200&wordType=full&apikey=${api}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const { rows } = data;
    const info = rows.filter((data: CharacterSearch) => data.level >= 100);
    return res.status(200).json(info);
  } else {
    return res.status(404);
  }
}

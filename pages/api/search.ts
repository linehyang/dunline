// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CharacterSearch } from "../../types/characterSearch";

const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const ENDPOINT = "https://api.neople.co.kr/df";
const MININUM_LEVEL_LIMIT = 100;
const PAGE_LIMIT = 50;

const getUrl = ({
  serverName,
  characterName,
  wordType,
}: {
  serverName: string;
  characterName: string;
  wordType: string;
}) => {
  return `${ENDPOINT}/servers/${serverName}/characters?characterName=${characterName}&limit=${PAGE_LIMIT}&wordType=${wordType}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //query parameters( 물음표 뒤에 = 로 연결된 key value pair 부분)을 url
  //뒤에 덧붙여서 추가적인 정보를 서버 측에 전달하는 것이다. 클라이언트가 어떤 특정 리소스에 접근하고 싶어하는지 정보를 담는다.
  const { serverName, characterName } = req.query;

  const url = getUrl({
    serverName: serverName.toString(),
    characterName: characterName.toString(),
    wordType:
      decodeURIComponent(characterName.toString()).length === 1
        ? "match"
        : "full",
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
    const { rows }: { rows: CharacterSearch[] } = data;
    const validUsers = rows.filter(({ level }) => level >= MININUM_LEVEL_LIMIT);

    return res.status(200).json(validUsers);
  } catch (e) {
    return res.status(500);
  }
}

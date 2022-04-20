// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const ENDPOINT = "https://api.neople.co.kr/df";
const TIMELINE_LIMIT = 100;
const TIMELINE_CODE = `504,505,509,515`;
const START_DATA = "20220317T0000";
const END_DATA = "20220419T0000";

//df api req timeline info url function
const reqUrl = ({
  server,
  characterid,
}: {
  server: string;
  characterid: string;
}) => {
  return `${ENDPOINT}/servers/${server}/characters/${characterid}/timeline?limit=${TIMELINE_LIMIT}&code=${TIMELINE_CODE}&startDate=${START_DATA}&endDate=${END_DATA}`;
};

//df api req timeline next info
const nextreqUrl = (url: string, next: string) => {
  return `${url}&next=${next}`;
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
    let { next, rows } = data.timeline;
    let acquire = rows;

    while (true) {
      let nextUrl = nextreqUrl(url, next);
      const response = await fetch(nextUrl, {
        headers: {
          apiKey: API_KEY ?? "",
        },
      });

      if (!response.ok) {
        return res.status(response.status);
      }

      const nextData = await response.json();
      next = nextData.timeline.next;
      rows = nextData.timeline.rows;
      acquire = [...acquire, ...rows];

      if (!next) {
        break;
      }
    }

    return res.status(200).json(acquire);
  } catch (e) {
    return res.status(500);
  }
}

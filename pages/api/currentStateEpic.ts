// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { format, sub } from "date-fns";

type TimeLineType = {
  code: number;
  name: string;
  date: string;
  data: {
    itemId: string;
    itemName: string;
    itemRarity: string;
    channelName: string;
    channelNo: number;
    dungeonName: string;
  };
};

const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const ENDPOINT = "https://api.neople.co.kr/df";
const TIMELINE_LIMIT = 100;
const TIMELINE_CODE = `504,505,509,515`;
// const START_DATA = "20220317T0000";
const END_DATA = format(new Date(), "yyyyMMdd'T'HHmm");
const START_DATA = format(
  sub(new Date(), {
    days: 90,
  }),
  "yyyyMMdd'T'HHmm"
);
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

    //획득한 에픽 itemId만 가져오기
    const array = acquire.map((timeLine: TimeLineType) => {
      return `${timeLine.data.itemId}`;
    });

    // 중복에픽 체크
    const result = array.filter((item: string, idx: number) => {
      return array.indexOf(item) === idx;
    });

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500);
  }
}

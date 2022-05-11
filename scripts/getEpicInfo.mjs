const shinwha = [
  "대제사장의 예복", //
  "대 마법사 [???]의 로브", //
  "낭만적인 선율의 왈츠", //
  "고대 심연의 로브", //
  "생사를 다스리는 그림자의 재킷", //
  "수석 집행관의 코트", //
  "최후의 전술", //
  "길 방랑자의 물소 코트", //
  "작열하는 대지의 용맹", //
  "트로피카 : 드레이크", //
  "웨어러블 아크 팩", //
  "종말의 역전", //
  "사탄 : 분노의 군주", //
  "천상의 날개", //
  "결속의 체인 플레이트", //
  "세상을 삼키는 분노", //
  "영명한 세상의 순환", //
  "선택이익", //
  "원시 태동의 대지", //
  "라이도 : 질서의 창조자", //
  "새벽을 녹이는 따스함", //
  "가네샤의 영원한 가호",
  "지고의 화염 - 이프리트", //
  "영원히 끝나지 않는 탐구", //
  "시간을 거스르는 자침", //
  "천지에 울려퍼지는 포효", //
  "숙명을 뒤엎는 광란", //
  "군신의 마지막 갈망", //
  "영원을 새긴 바다", //
  "또다른 시간의 흐름", //
  "플라즈마 초 진공관", //
  "영원한 나락의 다크버스", //
  "차원을 관통하는 초신성", //
  "운명을 거스르는 자", //
  "아린 고통의 비극", //
];

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const ENDPOINT = "https://api.neople.co.kr/df";
const API_KEY = process.env.NEXT_PUBLIC_DF_APIKEY;
const DIR_NAME = path.resolve();

const main = async () => {
  const epicInfos = [];

  for await (const shinwhaItem of shinwha) {
    const itemInfoResponse = await fetch(
      `${ENDPOINT}/items?itemName=${encodeURIComponent(shinwhaItem)}`,
      {
        headers: {
          apiKey: API_KEY ?? "",
        },
      }
    );
    const itemInfo = await itemInfoResponse.json();
    const itemId = itemInfo.rows[0].itemId;

    const item = await fetch(`${ENDPOINT}/items/${itemId}`, {
      headers: {
        apiKey: API_KEY ?? "",
      },
    });

    epicInfos.push(await item.json());
  }

  fs.writeFileSync(
    path.resolve(DIR_NAME, "public/epicItems.json"),
    JSON.stringify(epicInfos, null, 2)
  );
};

main();

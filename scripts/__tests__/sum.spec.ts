import { generateSearchParams } from "./sum";

/* test('테스트 코드명', () => {
  expect(실행값).toBe(기댓값);
}) */

type inputType = {
  pathname: string;
  server?: string;
  characterid?: string;
};

const input: inputType = {
  pathname: "/",
  server: "hilder",
  characterid: "라인향",
};

const serverList = [
  "all",
  "cain",
  "diregie",
  "siroco",
  "prey",
  "casillas",
  "hilder",
  "anton",
  "bakal",
];

describe("generateSearchParams 함수 테스트", () => {
  test("1. 기본 테스트(정상값 입력)", () => {
    expect(generateSearchParams(input)).toEqual(
      `${input.pathname}?server=${input.server}&characterid=${input.characterid}`
    );
  });

  test("2. server가 내가 지정한 입력값으로 입력되지 않은 경우", () => {
    expect(serverList.includes(input.server as string)).toBeTruthy();
  });

  test("3. 캐릭터 이름을 6글자 이상으로 기재한 경우", () => {
    expect(input.characterid?.length).toBeLessThanOrEqual(6);
  });
});

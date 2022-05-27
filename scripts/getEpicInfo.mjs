const all = [
  "리버시블 레더 코트",
  "숲속의 마녀 상의",
  "탐험가의 노련한 코트",
  "천지를 흔드는 석갑",
  "얼티밋 제너레이터",
  "천재 기술자의 전문 작업복 상의",
  "격동하는 마음",
  "어비스 리액터",
  "아머드 파워 상의",
  "흙으로 빚은 자연",
  "플래티넘 클래스 재킷",
  "드래곤 슬레이어",
  "천상을 수호하는 윙 아머",
  "죽음에 잠식된 갑주",
  "쉐도우블랙 슈트",
  "블루 베릴 아머",
  "엔트 정령의 상의",
  "하이테크 전술지휘 아머",
  "미련이 남은 녹슨 원혼",
  "어릴적 꿈꿔온 무대",
  "고귀한 신의",
  "옥화의 망령 흉갑",
  "옥화의 망령 대퇴갑",
  "지치지 않는 여정의 하의",
  "숨쉬는 자연의 생명",
  "천재 기술자의 멀티박스 팬츠",
  "라이트 어댑터 팬츠",
  "혼돈을 두른 장막",
  "무대의 화려함",
  "평화를 수호하는 윙 레깅스",
  "드래곤 라이더",
  "압도하는 힘의 하갑",
  "깨지지 않는 빛바랜 신념",
  "하이테크 전술보조 각반",
  "데저트 테크놀로지 팬츠",
  "벤타블랙 팬츠",
  "블루 베릴 하의",
  "엔트 정령의 하의",
  "스톰라이더",
  "네오 화이트 클래스 팬츠",
  "언리밋 사이버네틱",
  "굳건한 믿음",
  "침식되는 이성",
  "숲속의 마녀 하의",
  "데저트 컨실멘트 숄더",
  "근력 보강 숄더",
  "자유를 수호하는 윙 숄더",
  "하이테크 바디 프로텍트 숄더",
  "맹렬한 위세",
  "피어나는 자연의 삶",
  "끝을 바라보는 시선",
  "블랙 캣 헬멧",
  "빛을 잃은 진실",
  "오염된 빙석 견갑",
  "자신감의 백색 망토",
  "주체할 수 없는 낡은 규칙",
  "화려한 청색의 음율",
  "옥화의 망령 상박갑",
  "블루 베릴 보호대",
  "엔트 정령의 어깨",
  "천재 기술자의 보호 마스크",
  "헥타곤 임펄스 브릭",
  "매니퓰레이션",
  "드래곤 헌터",
  "마그네틱 서치 스캔",
  "숲속의 마녀 망토",
  "파괴된 신념",
  "옭아매는 공포",
  "익스펜션 서플라이 벨트",
  "음율에 담은 소망",
  "썬더 레지스트 벨트",
  "가이드 라인 벨트",
  "순수한 자연의 이치",
  "얼터레이션 다이얼 벨트",
  "하이테크 서플라이 벨트",
  "마주할 수 없는 부러진 긍지",
  "별을 담는 벨트",
  "마땅한 본분",
  "옥화의 망령 요갑",
  "블루 베릴 벨트",
  "엔트 정령의 벨트",
  "천재 기술자의 멀티툴 벨트",
  "대지를 수호하는 윙 벨트",
  "드래곤 스케빈저",
  "파워 플랜트",
  "불변의 부유석 벨트",
  "고고함의 백색 벨트",
  "숲속의 마녀 벨트",
  "움직이는 쇠약한 집착",
  "순환하는 자연의 섭리",
  "폭주하는 육신",
  "절망의 발소리",
  "일렉트릭 프루프 부츠",
  "검은 발자국",
  "엑셀러레이터",
  "하이테크 고기동 강화 부츠",
  "내딛는 용기",
  "드래곤 패스파인더",
  "대지를 딛는 부츠",
  "소망을 전하는 편지",
  "스팀펑크 소닉 디스럽터",
  "블루 베릴 부츠",
  "엔트 정령의 신발",
  "천재 기술자의 두터운 보호부츠",
  "신비함의 백색 구두",
  "HEM 리인포스 부츠",
  "하늘을 수호하는 윙 부츠",
  "어둠에 삼켜진 돌굽",
  "옥화의 망령 각갑",
  "숲속의 마녀 신발",
  "아크 블라스터 소스",
  "전술 드론 콘트롤러 암릿",
  "생명이 담긴 가죽 토시",
  "화음하는 음색",
  "숲속의 마녀 팔찌",
  "세컨드 스페이드 - 어쏘러티",
  "리플레이서",
  "미니어쳐 헤드셋 암릿",
  "작은 풀잎의 순수함",
  "흑화의 구속 팔찌",
  "구속된 자유",
  "찬란한 금장 팔찌",
  "수호룡의 비호 - 자비",
  "포인트 레이더 암릿",
  "골렘의 핵 팔찌",
  "무뎌지는 둔화된 변화",
  "이온화조정 팔찌",
  "수확하는 옥수",
  "기사의 구원",
  "블루 베릴 암릿",
  "엔트 정령의 팔찌",
  "억제된 마력의 팔찌",
  "냉혹한 현실의 목걸이",
  "블루 베릴 네클레스",
  "엔트 정령의 목걸이",
  "고양된 분노의 목걸이",
  "골렘의 심장 목걸이",
  "임펄스 트리거",
  "수호룡의 비호 - 용기",
  "기품의 금빛 장신구",
  "숲속의 마녀 목걸이",
  "절대감각의 방위구",
  "테크놀로지 바디캠 네클리스",
  "솔저 호너 네클리스",
  "잠겨진 영역",
  "죄어오는 풍화된 악의",
  "검은 별",
  "약동하는 생명의 고동",
  "퍼스트 스페이드 - 노블레스",
  "푸른 자연의 씨앗",
  "머신 컨트롤러 리모트",
  "기사의 속죄",
  "잔잔한 선율",
  "디젯 퓨즈 초크",
  "개화하는 신비의 꽃",
  "블루 베릴 링",
  "엔트 정령의 반지",
  "자기장 탐지링",
  "오버커런트 마그넷 링",
  "골드 윙 반지",
  "반짝이는 음율",
  "고통의 상처",
  "숲속의 마녀 반지",
  "핏빛의 결정 반지",
  "빛을 발하는 생명",
  "기사의 긍지",
  "원터치 스마트 리모콘",
  "골렘의 중추석 반지",
  "레드 라이프 링",
  "뚜렷해지는 소멸된 사념",
  "서드 스페이드 - 데스",
  "수호룡의 비호 - 축복",
  "멈추지 않는 운명",
  "이동하는 요새",
  "전술 레이더망 링",
  "어댑터블 투톤 링",
  "생명의 근원이 담긴 배낭",
  "블루 베릴 퍼퓸",
  "엔트 정령의 성배",
  "터치 컨트롤 패널",
  "드러나는 흐릿한 지식",
  "여명의 성배",
  "굴착 강화 파츠",
  "죽음을 부르는 관",
  "숲속의 마녀 바구니",
  "불길한 데칼코마니 석판",
  "미지의 문명 - 마스크 스톤",
  "내면의 얼굴",
  "정의의 기사 가면",
  "버츄얼 사이트 글래스",
  "파괴된 생명",
  "꿈같은 환호성",
  "올 오어 원 매직박스",
  "용살자의 증표 - 용골 뿔피리",
  "찰랑이는 생명수",
  "데카 가이던스 디바이스",
  "공중형 : 전술 프롭 드론",
  "홀로그램 콜",
  "피어오르는 광기",
  "자연에 녹아드는 이슬",
  "블루 베릴 젬스톤",
  "엔트 정령의 심장",
  "선회하는 흐려진 혜안",
  "잿빛의 묘상석",
  "지상형 : 전술 차륜 드론",
  "용살자의 증표 - 용심 가공석",
  "저주받은 마음",
  "숲속의 마녀 정령석",
  "도데카 홀로그램",
  "생명이 깃든 초록빛 액체",
  "미지의 문명 - 스타 스톤",
  "미니 배터리 팩",
  "언비튼 메달",
  "어둠을 먹는 심장",
  "거짓 속의 거짓",
  "두근거리는 열정",
  "억류된 혼의 령주",
  "평화를 위한 투쟁",
  "미지의 황금비석",
  "자정의 성역",
  "생명을 키우는 코발트 스틱",
  "부스팅 펄스 튜브",
  "인력의 법칙",
  "용살자의 증표 - 용린 귀걸이",
  "숲속의 마녀 귀걸이",
  "저주받은 굴레",
  "오퍼레이션 오더",
  "타락한 영혼",
  "아크로매틱 룸버스",
  "들이치는 희미한 탄식",
  "폭발형 : 소형 전술 플레어",
  "청명한 아침의 새싹",
  "시각의 관점",
  "마음을 전달하는 소리",
  "엔데카 코어 칩",
  "배회하는 혼령의 향로",
  "황혼의 성단",
  "하늘에 휘날리는 깃털",
  "미지의 문명 - 트윈 스톤",
  "블루 베릴 이어링",
  "엔트 정령의 귀걸이",
  "폭풍을 삼킨 에너지",
  "컨퓨즈드 코어 슈트",
  "딥 다이버 슈트",
  "딥 다이버 에어팩",
  "메탈기어 암 숄더",
  "딥 다이버 팬츠",
  "로보티카 컴뱃 팬츠",
  "딥 다이버 슈즈",
  "사이버틱 스피드 부츠",
  "얼터레이션 다이얼 벨트",
  "딥 다이버 벨트",
  "쿨링 서포트 벨트",
  "아토믹 코어 네클레스",
  "딥 다이버 네클레스",
  "에너지 서치 링",
  "딥 다이버 네비게이션 링",
  "파워 네비게이트 팩",
  "딥 다이버 워치",
  "초소형 GPS",
  "딥 다이버 이어링",
  "옵티컬 컴뱃 글래스",
  "딥 다이버 오리발",
  "완성형 동력 제어장치",
  "딥 다이버 마스크",
];
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
  "운명을 거스르는 자",
  "아린 고통의 비극",
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

  for await (const shinwhaItem of all) {
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

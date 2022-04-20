import { EpicDetail } from "../public/epicDetail";

type epic = typeof EpicDetail;

const EPIC_FILTER = "상태 이상";

const filter = (epic: epic) => {
  const epicList = Object.entries(EpicDetail);
  let result: any = [];
  epicList.map((el) => {
    return el[1].filter((e) => {
      if (e.includes(EPIC_FILTER) && !result.includes(el)) {
        result.push(el);
      }
    });
  });

  return result;
};

export default function EpicConcept() {
  const result = filter(EpicDetail);

  return (
    <>
      <div>{EPIC_FILTER}</div>
      {result
        ? result.map((el: any) => {
            return (
              <>
                <div>{`{'${el[0]}' : '${el[1][0]}'},`}</div>
              </>
            );
          })
        : null}
    </>
  );
}

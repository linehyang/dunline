import useSWR from "swr";

//에픽 정보를 가져오기 위한 컴포넌트 실제로 사용되지는 않음.
export default function EpicDetail() {
  const url = `/api/epic`;

  const { data } = useSWR(url);

  return (
    <div>
      {data
        ? data.map((el: any) => {
            return (
              <div key={el[2]}>
                <div>
                  &#39;{el[2]}&#39; : &#91;&#39;{el[0]}&#39;, &#39;
                  {el[1].options[0].explain}&#39;,&#39;
                  {el[1].options[1].explain}&#39;,&#39;
                  {el[1].options[2].explain}&#39;,&#39;
                  {el[1].options[3].explain}&#39;,&#93; ,
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

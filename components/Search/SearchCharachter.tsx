import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Router from "next/router";
import Image from "next/image";
import useSWR from "swr";

import SearchForm from "./SearchForm";
import { CharacterSearch, SERVER_LIST } from "../../interface/characterSearch";

const SearchResultUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  text-align: center;
  padding: 0 10rem;

  > li {
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 1rem;
    margin-right: 0.5rem;
    width: 24%;
    min-height: 300px;
  }
`;

//캐릭터 검색을 위한 컴포넌트
function SearchCharacter() {
  const [url, setUrl] = useState<string | null>(null);

  //data는 배열이며 배열속에 각각의 데이터가 객체로 담기기 때문에 이렇게 해둠
  const { data } = useSWR<CharacterSearch[]>(url);

  return (
    <Box p="5rem">
      <SearchForm
        onUserInfo={(url) => {
          setUrl(url);
        }}
      />
      <SearchResultUl>
        {data
          ? data.map(
              ({
                characterId,
                jobGrowName,
                serverId,
                characterName,
                level,
              }) => {
                return (
                  <li
                    key={characterId}
                    onClick={() =>
                      Router.push(
                        `/setting?server=${serverId}&characterid=${characterId}`
                      )
                    }
                  >
                    <div>{jobGrowName}</div>
                    <Box
                      position="relative"
                      width="100%"
                      paddingTop="100%"
                      transform="scale(1.2)"
                    >
                      <Image
                        src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`}
                        layout="fill"
                        alt={`${characterName}의 정보`}
                      />
                    </Box>
                    <div>{SERVER_LIST[serverId]}</div>
                    <div>
                      Lv.{level} {characterName}
                    </div>
                  </li>
                );
              }
            )
          : null}
      </SearchResultUl>
    </Box>
  );
}

export default SearchCharacter;

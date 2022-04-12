import { Box } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { CharacterSearch, SERVER_LIST } from "../types/characterSearch";
import Router from "next/router";
import Image from "next/image";
import useSWR from "swr";
import React, { useState } from "react";

function SearchCharacter() {
  const [serverSelect, setServerSelect] = useState("all");
  const [characterName, setCharacterName] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  const { data } = useSWR(url);

  //서버 선택 State
  const selectServerHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerSelect(e.target.value);
  };

  //캐릭터 닉네임 input State
  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const serverSelect = e.target.server.value;
    // const characterName = encodeURIComponent(e.target.characterName.value);
    setUrl(
      `/api/search?serverSelect=${serverSelect}&characterName=${encodeURIComponent(
        characterName
      )}`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          name="server"
          width="120px"
          borderRadius="0px"
          textAlign="center"
          onChange={selectServerHandler}
        >
          <option value="all">전체</option>
          <option value="cain">카인</option>
          <option value="diregie">디레지에</option>
          <option value="siroco">시로코</option>
          <option value="prey">프레이</option>
          <option value="casillas">카시야스</option>
          <option value="hilder">힐더</option>
          <option value="anton">안톤</option>
          <option value="bakal">바칼</option>
        </Select>
        <Input
          placeholder="캐릭터명"
          width="400px"
          onChange={inputNameHandler}
          name="characterName"
          value={characterName}
        />
        <Button type="submit" colorScheme="teal" variant="link">
          검색
        </Button>
      </form>
      <Box>
        <ul>
          {data
            ? data.map((info: CharacterSearch) => {
                return (
                  <li
                    key={info.characterId}
                    onClick={() =>
                      Router.push(
                        `/setting/?server=${info.serverId}&characterid=${info.characterId}`
                      )
                    }
                  >
                    <div>{SERVER_LIST[info.serverId]}</div>
                    <div>{info.characterName}</div>
                    <div>{info.jobGrowName}</div>
                    <div>{info.level}</div>
                    <Image
                      src={`https://img-api.neople.co.kr/df/servers/${info.serverId}/characters/${info.characterId}?zoom=1`}
                      width={200}
                      height={200}
                      alt={`${info.characterName}의 정보`}
                    />
                  </li>
                );
              })
            : null}
        </ul>
      </Box>
    </>
  );
}

export default SearchCharacter;

import { Box } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import useSWR from "swr";

import React, { useState } from "react";

function SearchCharacter() {
  const [serverSelect, setServerSelect] = useState("all");
  const [characterName, setCharacterName] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useSWR(
    shouldFetch
      ? `/api/search?serverSelect=${serverSelect}&characterName=${encodeURIComponent(
          characterName
        )}`
      : null
  );

  //서버 선택 State
  const selectServerHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerSelect(e.target.value);
  };

  //캐릭터 닉네임 input State
  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const searchCharacterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("asdfadsf", serverSelect, characterName);
    setShouldFetch(true);
    // let characterUri = encodeURI(characterName);
    // const server = `https://api.neople.co.kr/df/servers/${serverSelect}/characters?characterName=${characterName}&apikey=${api}`;
  };

  return (
    <Box display="flex">
      <Select
        placeholder="전체"
        width="120px"
        borderRadius="0px"
        textAlign="center"
        onChange={selectServerHandler}
      >
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
        value={characterName}
      />
      <Button
        colorScheme="teal"
        variant="link"
        onClick={searchCharacterHandler}
      >
        검색
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}

export default SearchCharacter;

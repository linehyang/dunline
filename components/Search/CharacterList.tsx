import React from "react";
import Link from "next/link";
import { Box, AspectRatio } from "@chakra-ui/react";

import Image from "next/image";
import useSWR from "swr";

import { CharacterSearch, SERVER_LIST } from "../../interface/characterSearch";

interface Props {
  url: string | null;
}

//캐릭터 검색을 위한 컴포넌트
export default function CharacterList({ url }: Props) {
  const { data, isValidating } = useSWR<CharacterSearch[]>(url);

  return (
    <Box
      as="ul"
      display="grid"
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap="10px"
      textAlign="center"
    >
      {data
        ? data.map(
            ({ characterId, jobGrowName, serverId, characterName, level }) => (
              <Box
                key={characterId}
                as="li"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                border="1px solid gray"
                borderRadius="5px"
                padding="20px 0"
                _hover={{
                  backgroundColor: "gray.800",
                }}
              >
                <Link
                  href={`/setting?server=${serverId}&characterid=${characterId}`}
                  passHref
                  prefetch={false}
                >
                  <a>
                    <Box>{jobGrowName}</Box>
                    <AspectRatio
                      width="100%"
                      ratio={1 / 1}
                      transform="scale(1.2)"
                    >
                      <Image
                        src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`}
                        layout="fill"
                        alt={`${characterName}의 정보`}
                      />
                    </AspectRatio>
                    <Box>
                      <Box>{SERVER_LIST[serverId]}</Box>
                      <Box>
                        Lv.{level} {characterName}
                      </Box>
                    </Box>
                  </a>
                </Link>
              </Box>
            )
          )
        : null}
    </Box>
  );
}

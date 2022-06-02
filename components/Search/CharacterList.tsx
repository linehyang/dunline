import React from "react";
import Link from "next/link";
import { Box, AspectRatio } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import useSWR from "swr";

import { CharacterSearch, SERVER_LIST } from "../../interface/characterSearch";

interface Props {
  url: string | null;
  search?: {
    serverName: string | string[] | undefined;
    characterName: string | string[] | undefined;
  };
}

//캐릭터 검색을 위한 컴포넌트
export default function CharacterList({ url }: Props) {
  const { data } = useSWR<CharacterSearch[]>(url);

  if (data?.length === 0) {
    return <Box textAlign="center">해당 캐릭터는 존재하지 않습니다</Box>;
  }

  return (
    <Box
      as="ul"
      display="grid"
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap="3px"
    >
      {data &&
        data.map(
          ({ characterId, jobGrowName, serverId, characterName, level }) => (
            <StyledBox
              key={characterId}
              as="li"
              display="flex"
              flexDirection="column"
              padding="15px 10px"
              position="relative"
              // _hover={{
              //   transform: "scale(1.1)",
              // }}
            >
              <Link
                href={`/setting?server=${serverId}&characterid=${characterId}`}
                passHref
                prefetch={false}
              >
                <Box as="a">
                  <Box backgroundColor="#8d8d8d">
                    <Box
                      as="span"
                      display="inline-block"
                      fontSize="sm"
                      borderRadius="5px"
                      border="1px solid #ffffff"
                      padding="1px 3px"
                      marginLeft="10px"
                      marginTop="10px"
                    >
                      {SERVER_LIST[serverId]}
                    </Box>
                    <Box overflow="hidden">
                      <AspectRatio
                        width="100%"
                        height="300px"
                        ratio={1 / 1}
                        transform="scale(1.5)"
                        bottom="60px"
                        pointerEvents="none"
                      >
                        <Image
                          src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`}
                          layout="fill"
                          alt={`${characterName}의 정보`}
                          placeholder="blur"
                          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        />
                      </AspectRatio>
                    </Box>
                  </Box>
                  <Box padding="15px 0">
                    <Box display="flex" justifyContent="space-between">
                      <Box fontSize="sm" color="#F96539">
                        Level {level}
                      </Box>
                      <Box fontSize="sm" opacity="0.7">
                        {jobGrowName}
                      </Box>
                    </Box>
                    <Box fontSize="2xl" fontWeight="700">
                      {characterName}
                    </Box>
                  </Box>
                </Box>
              </Link>
            </StyledBox>
          )
        )}
    </Box>
  );
}

const StyledBox = styled(Box)`
  @media (hover: hover) {
    a: hover {
      transform: scale(1.1);
    }
  }
`;

import { Box } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  server?: string | string[] | undefined;
  characterid?: string | string[] | undefined;
};

function Header({ server, characterid }: Props) {
  return (
    <>
      <Box
        display="flex"
        margin="0 auto"
        maxWidth="800px"
        justifyContent="flex-end"
      >
        <Box border="1px solid #ffffff">
          <Link
            href={`/setting?server=${server}&characterid=${characterid}`}
            passHref
            prefetch={false}
          >
            <a>인게임 정보</a>
          </Link>
        </Box>
        <Box border="1px solid #ffffff">
          <Link
            href={`/concept?server=${server}&characterid=${characterid}`}
            passHref
            prefetch={false}
          >
            <a>각 컨셉별 득템 현황</a>
          </Link>
        </Box>
      </Box>
      <Box
        as="header"
        minWidth="320px"
        textAlign="center"
        padding="20px 0"
        fontSize="6xl"
      >
        <h1>DUNLINE</h1>
      </Box>
    </>
  );
}

export default Header;

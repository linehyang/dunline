import { Box } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  server?: string | string[];
  characterid?: string | string[];
};

const generateSearchParams = ({
  pathname,
  server,
  characterid,
}: {
  pathname: string;
  server?: string | string[];
  characterid?: string | string[];
}) => {
  if (server && characterid) {
    return `${pathname}?server=${server}&characterid=${characterid}`;
  }
  return pathname;
};

function Header({ server, characterid }: Props) {
  return (
    <Box as="header" position="relative" margin="0 auto" maxWidth="800px">
      <Box display="flex" padding="0 20px">
        <Box marginRight="10px">
          <Link
            href={generateSearchParams({
              pathname: "/setting",
              server,
              characterid,
            })}
            passHref
            prefetch={false}
          >
            <a>인게임 정보</a>
          </Link>
        </Box>
        <Box>
          <Link
            href={generateSearchParams({
              pathname: "/concept",
              server,
              characterid,
            })}
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
        <Link href={"/"} passHref prefetch={false}>
          <a>
            <h1>DUNLINE</h1>
          </a>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;

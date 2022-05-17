import { Box } from "@chakra-ui/react";
import Link from "next/link";
import styled from "@emotion/styled";
import Image from "next/image";

import KakaoLogo from "../../public/images/ic_kakao.svg";

type Props = {
  server?: string | string[];
  characterid?: string | string[];
  LogoHandler?: boolean;
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

function Header({ server, characterid, LogoHandler }: Props) {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      maxHeight="77px"
      height="100%"
      padding="20px 40px"
      fontSize="sm"
      alignItems="center"
    >
      {LogoHandler ? (
        <Box position="relative" width="120px" height="37px">
          <Link
            href={generateSearchParams({
              pathname: "/",
              server,
              characterid,
            })}
            passHref
            prefetch={false}
          >
            <a>
              <Image
                src="/images/dunline_logo/dunline_logo@2x.png"
                alt="dunline hearder logo"
                layout="fill"
              />
            </a>
          </Link>
        </Box>
      ) : (
        <Box />
      )}
      <StyledBox display="flex" alignItems="center">
        <Box>
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
            <a>컨셉별 득템 현황</a>
          </Link>
        </Box>
        <Box>사용 가이드</Box>
        <Box>
          <Link
            href="https://open.kakao.com/o/s3Dh8Afe"
            passHref
            prefetch={false}
          >
            <a>
              <StyledKaKaoIcon />
            </a>
          </Link>
        </Box>
      </StyledBox>
    </Box>
  );
}

export default Header;

const StyledBox = styled(Box)`
  & > :not(:last-child) {
    margin-right: 25px;
    :hover {
      color: #e93325;
    }
  }
`;

const StyledKaKaoIcon = styled(KakaoLogo)`
  padding-top: 2px;
  color: #000000;
  fill: #aaa;

  &:hover {
    fill: #f9e000;
  }
`;

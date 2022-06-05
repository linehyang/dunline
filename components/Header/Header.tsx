import { useState, useEffect } from "react";
import { Box, Collapse, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

import NavigationItems from "./NavigationItems";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import KakaoLogo from "../../public/images/ic_kakao.svg";

type Props = {
  server?: string | string[];
  characterid?: string | string[];
  showLogo?: boolean;
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

function Header({ server, characterid, showLogo }: Props) {
  const [isToggle, setIsToggle] = useState(false);
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTargetReached(window.innerWidth > 576);
    };

    if (window) {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <Box as="header" position="relative">
      <HeaderBody>
        <Box position="relative" width="120px" height="38px">
          {showLogo && (
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
                  src="/images/dunline_logo/dunline_logo.png"
                  alt="홈으로 이동"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                />
              </a>
            </Link>
          )}
        </Box>
        <NavigationItems
          server={server as string}
          characterid={characterid as string}
          QuestionElement={
            targetReached ? (
              <Link
                href="https://open.kakao.com/o/s3Dh8Afe"
                passHref
                prefetch={false}
              >
                <a>
                  <StyledKaKaoIcon aria-label="문의하기" />
                </a>
              </Link>
            ) : (
              <Link
                href="https://open.kakao.com/o/s3Dh8Afe"
                passHref
                prefetch={false}
              >
                <a>
                  <>문의하기</>
                </a>
              </Link>
            )
          }
          ParentComponent={
            targetReached ? (
              <Box />
            ) : (
              <Collapse style={{ width: "100%" }} in={isToggle} />
            )
          }
        />
      </HeaderBody>
      <MenuButton
        icon={!isToggle ? <GiHamburgerMenu color="#000000" /> : <GrClose />}
        type="button"
        aria-label="반응형 헤더 햄버거"
        onClick={() => setIsToggle(!isToggle)}
        fontSize="30px"
        padding="0 5px"
      />
    </Box>
  );
}

export default Header;

const HeaderBody = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px;
  font-size: sm;
  align-items: center;

  @media (max-width: 576px) {
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;

    & > :first-child {
      margin-left: -12px;
    }
  }
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 576px) {
    position: absolute;
    top: 20px;
    right: 20px;
    display: block;
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

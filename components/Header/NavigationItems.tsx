import type { ReactNode, ReactElement } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

import UserGuide from "./UserGuide";
import { generateSearchParams } from "../../util/characterSearchUtil";

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 25px;
    :hover {
      color: #e93325;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 30px;

    & > :not(:last-child) {
      margin: 0;
      :hover {
        color: #e93325;
      }
    }

    & > * {
      width: 100%;
      margin: 0;
      padding: 8px 0;
      border-bottom: 1px solid white;
      :hover {
        color: #e93325;
      }
    }
  }
`;

interface Props {
  server: string;
  characterid: string;
  QuestionElement: ReactNode;
  ParentComponent?: ReactElement;
}

export default function NavigationItems({
  server,
  characterid,
  QuestionElement,
  ParentComponent = <></>,
}: Props) {
  const route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ParentComponent.type {...ParentComponent.props}>
      <StyledBox as="ul" fontSize="14px" fontWeight="500">
        <Box
          as="li"
          color={route.pathname === "/setting" ? "#e93325" : "inherit"}
        >
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
        <Box
          as="li"
          color={route.pathname === "/concept" ? "#e93325" : "inherit"}
        >
          <Link
            href={generateSearchParams({
              pathname: "/concept",
              server,
              characterid,
            })}
            passHref
            prefetch={false}
          >
            <a>컨셉 커스텀</a>
          </Link>
        </Box>
        <Box
          as="li"
          onClick={onOpen}
          _hover={{
            cursor: "pointer",
          }}
        >
          사용 가이드
          <UserGuide isOpen={isOpen} onClose={onClose} />
        </Box>
        <Box as="li">{QuestionElement}</Box>
      </StyledBox>
    </ParentComponent.type>
  );
}

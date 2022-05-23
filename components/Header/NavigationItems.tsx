import type { ReactNode, ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";

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
  return (
    <ParentComponent.type {...ParentComponent.props}>
      <StyledBox as="ul" fontSize="14px" fontWeight="500">
        <Box as="li">
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
        <Box as="li">
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
        <Box as="li">사용 가이드</Box>
        <Box as="li">{QuestionElement}</Box>
      </StyledBox>
    </ParentComponent.type>
  );
}

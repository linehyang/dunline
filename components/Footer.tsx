import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";

export default function Footer() {
  return (
    <StyledFooter
      as="footer"
      display="flex"
      justifyContent="space-between"
      padding="20px 50px"
      borderTop="1px solid gray"
    >
      <Box fontSize="sm">© DUNLINE. All rights reserved.</Box>
      <Box position="relative" width="190px" height="18px">
        <Link
          href="https://open.kakao.com/o/s3Dh8Afe"
          passHref
          prefetch={false}
        >
          <a>
            <Image
              src="/images/footer_neople/footer_neople@2x.png"
              alt="footer API Link"
              layout="fill"
            />
          </a>
        </Link>
      </Box>
    </StyledFooter>
  );
}

const StyledFooter = styled(Box)`
  @media (max-width: 576px) {
    flex-direction: column;
    padding: 20px 30px;
  }
`;

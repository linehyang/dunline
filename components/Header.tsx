import { Box } from "@chakra-ui/react";
import Image from "next/image";

function Header() {
  return (
    <>
      <Box
        h="200"
        display="flex"
        alignItems="center"
        borderBottom="1px solid black"
      >
        <Image
          src="/../public/images/profile.png"
          alt="추후 업데이트 예정"
          width={100}
          height={100}
        />
      </Box>
    </>
  );
}

export default Header;

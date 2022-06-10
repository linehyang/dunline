import Head from "next/head";
import { Box, VisuallyHidden, Heading } from "@chakra-ui/react";
import Image from "next/image";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";

function UserGuide() {
  return (
    <>
      <Head>
        <title>던라인 - 사용 가이드</title>
        <meta name="description" content="사용 가이드 " />
      </Head>
      <VisuallyHidden>
        <Heading as="h1">던라인 - 이용가이드</Heading>
      </VisuallyHidden>
      <Box display="flex" flexDirection="column" height="100%">
        <Header showLogo />
        <Box
          as="main"
          flex="1"
          width="100%"
          maxWidth="800px"
          margin="60px auto 0"
          padding="0 20px"
        >
          <Box
            as="h2"
            fontSize="20px"
            fontWeight="700"
            textAlign="center"
            marginBottom="40px"
          >
            던라인 사용 가이드
          </Box>
          <Box textAlign="center">
            던라인은 105레벨 에픽장비를 컨셉별 장비 커스텀, 컨셉별 득템여부
            확인할 수 있는 웹사이트입니다.
          </Box>
          <Box marginBottom="30px" textAlign="center">
            아래의 사용 가이드를 확인 후 이용하시는것을 추천 드립니다.
          </Box>
          <Box as="ol" marginBottom="40px" fontSize="15px">
            <Box as="li" fontWeight="500" marginBottom="10px">
              <Box as="h3" textAlign="center" fontSize="18px">
                홈
              </Box>
            </Box>
            <Box as="li">
              - 홈 화면은 캐릭터를 검색하기 위한 페이지이며 서버명과 캐릭터명을
              입력하여 캐릭터를 검색할 수 있습니다.
            </Box>
            <Box as="li" wordBreak="keep-all">
              - 서버는 전체 혹은 특정 서버명을 선택할 수 있으며 서버를 선택한 후
              캐릭터명을 입력하여 검색을 하면 캐릭터 검색 페이지로 이동합니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/home_search.png"
                  alt="userGuide home_search"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
          </Box>
          <Box as="ol" marginBottom="40px" fontSize="15px">
            <Box as="li" fontWeight="500" marginBottom="10px">
              <Box as="h3" textAlign="center" fontSize="18px">
                캐릭터 검색
              </Box>
            </Box>
            <Box as="li">
              - 홈 화면에서 캐릭터 검색을 하면 아래와 같이 검색 결과가 나타나며
              캐릭터를 클릭하면 클릭된 캐릭터의 인게임 정보를 확인 할 수 있는
              인게임 정보 페이지로 이동합니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/search_character.png"
                  alt="userGuide search_character"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
          </Box>
          <Box as="ol" marginBottom="40px" fontSize="15px">
            <Box as="li" fontWeight="500" marginBottom="10px">
              <Box as="h3" textAlign="center" fontSize="18px">
                인게임 정보
              </Box>
            </Box>
            <Box as="li">
              - 인게임 정보 페이지에서는 모험단명, 캐릭터 레벨, 캐릭터명,직업,
              장착 장비의 컨셉, 장착 장비의 성장 레벨, 장착 장비 옵션, 증폭 &
              강화 수치를 확인 할 수 있습니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/setting_main.png"
                  alt="userGuide setting_user"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
            <Box as="li" marginTop="20px">
              - 각각의 컨셉에 마우스를 올려다 놓으면 특정 컨셉에 해당하는 에픽
              장비를 확인할 수 있습니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/setting_concept.png"
                  alt="userGuide setting_concept"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
            <Box as="li" marginTop="20px">
              - 장착하고 있는 에픽아이템에 마우스를 올려다 놓으면 해당 에픽
              아이템의 옵션을 확인할 수 있습니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/setting_iteminfo.png"
                  alt="userGuide setting_concept"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
          </Box>
          <Box as="ol" marginBottom="40px" fontSize="15px">
            <Box as="li" fontWeight="500" marginBottom="10px">
              <Box as="h3" textAlign="center" fontSize="18px">
                컨셉 커스텀
              </Box>
            </Box>
            <Box as="li">
              - 인게임 정보 페이지에서 우측상단에 있는 컨셉 커스텀을 클릭하여
              해당 페이지로 이동하게 되면 기본적으로 검색한 캐릭터가 장착하고
              있는 장비가 커스텀 창에 들어갑니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/concept_character.png"
                  alt="userGuide setting_concept"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
            <Box as="li" marginTop="20px">
              - 컨셉 커스텀 페이지에서는 내가 원하는 컨셉을 검색하여 해당 컨셉에
              해당하는 아이템의 득템여부와 커스텀을 할 수 있습니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/concept_select.png"
                  alt="userGuide setting_concept"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>

            <Box as="li" marginTop="20px">
              - 홈 화면에서 바로 메뉴에 있는 컨셉 커스텀 페이지로 이동하게 될
              경우 캐릭터 정보는 보여주지 않지만, 컨셉 커스텀은 가능합니다.
              <Box
                position="relative"
                width="100%"
                height="40vh"
                border="2px solid #ffffff"
                marginTop="20px"
              >
                <Image
                  src="/images/userGuide/concept_notcharacter.png"
                  alt="userGuide setting_concept"
                  layout="fill"
                  unoptimized={true}
                  priority
                />
              </Box>
            </Box>
          </Box>
          <Box>주의 사항</Box>
          <Box as="ul" fontSize="12px">
            <Box as="li">
              ⌗ 110레벨 최고 레벨 확장에 맞춰 만들어진 웹사이트로 100레벨 이하의
              세트 아이템 및 장비에 대해서는 취급하지 않습니다.
            </Box>
            <Box as="li">
              ⌗ 득템현황의 경우 2022 3/17 오전 12시를 기준으로 하여 현재시간까지
              캐릭터의 타임라인 정보를 받아와 득템여부를 확인합니다.
            </Box>
            <Box as="li">
              ⌗ 장비 해체는 별도로 타임라인에 기록되지 않기 때문에 득템으로
              표시됩니다.
            </Box>
            <Box as="li">
              ⌗누락이 있거나, 새롭게 컨셉을 추가했으면 하는 장비나 세팅이 있으신
              경우 카톡 오픈채팅방을 통해 문의주시면 개선하도록 하겠습니다.
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default UserGuide;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserGuide({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay background="#000000" />
      <ModalContent>
        <ModalHeader color="#000000" fontSize="17px" fontWeight="700">
          던라인 사용 가이드
        </ModalHeader>
        <ModalBody color="#000000">
          <Box marginBottom="20px">
            던라인은 110레벨 최고 레벨 확장으로 인해 새롭게 출시된 105레벨 에픽
            장비에 대해서 컨셉별 득템여부와 컨셉별 장비 커스텀을 해볼 수 있는
            웹사이트입니다
          </Box>
          <StyledBox as="ul">
            <Box as="li" fontWeight="500">
              던라인은 아래의 기능을 제공합니다
            </Box>
            <Box as="li">
              → 서버와 캐릭터명을 입력하여 확인하고자 하는 캐릭터를 검색할 수
              있습니다
              <Box as="p">⌗ 현재 모험단 검색기능은 제공하지 않고 있습니다</Box>
            </Box>
            <Box as="li">
              → 인게임 정보에서는 모험단명, 캐릭터 레벨, 닉네임, 직업, 장착
              장비의 컨셉, 장착 장비의 성장 레벨, 장착 장비 옵션을 확인 할 수
              있습니다
              <Box as="p">
                ⌗ 110레벨 최고 레벨 확장에 맞춰 만들어진 웹사이트로 100레벨
                이하의 세트 아이템 및 장비에 대해서는 취급하지 않고 있습니다
              </Box>
            </Box>
            <Box as="li">
              → 컨셉 커스텀에서는 컨셉별 장비 커스텀 및 각 컨셉별 득템 현황을
              확인할 수 있습니다. 득템현황의 경우 2022 3/17 오전 12시를 기준으로
              현재시간까지 캐릭터의 타임라인 정보를 받아와 득템여부를 확인합니다
              <Box as="p">
                ⌗ 장비 해체는 별도로 타임라인에 기록되지 않기 때문에 득템으로
                표시됩니다
              </Box>
              <Box as="p">
                ⌗ 컨셉 커스텀의 경우에는 캐릭터명을 검색하지 않아도 커스텀이
                가능합니다
              </Box>
            </Box>
            <Box as="li" fontSize="13px">
              ⌗누락이 있거나, 새롭게 컨셉을 추가했으면 하는 장비나 세팅이 있으신
              경우 카톡 오픈채팅방을 통해 문의주시면 개선하도록 하겠습니다
            </Box>
          </StyledBox>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const StyledBox = styled(Box)`
  li {
    margin-bottom: 20px;
  }

  p {
    color: red;
    margin-top: 10px;
    font-size: 15px;
  }
`;

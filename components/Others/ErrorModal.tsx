import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";

interface Props {
  onClose: () => void;
}

export default function ErrorModal({ onClose }: Props) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black"></ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody color="black" textAlign="center">
          <Box>인게임 정보 확인은 서버와 닉네임 입력이 필요합니다</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            나가기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

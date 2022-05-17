import { useEffect } from "react";
import {
  Select,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import SearchIcon from "../../public/images/ic_search.svg";

import { SERVER_LIST } from "../../interface/characterSearch";
import { setValues } from "framer-motion/types/render/utils/setters";

const initialSearchFormValue = {
  serverName: "all",
  characterName: "",
};
type SearchFormValue = typeof initialSearchFormValue;

interface Props {
  handleSubmit: (url: string) => void;
  search?: {
    serverName: string | undefined;
    characterName: string | undefined;
  };
}

export default function SearchForm({ handleSubmit, search }: Props) {
  const router = useRouter();
  const { register, handleSubmit: handleFormSubmit } = useForm<SearchFormValue>(
    {
      defaultValues: search
        ? (search as SearchFormValue)
        : initialSearchFormValue,
    }
  );

  const onSubmit = ({ serverName, characterName }: SearchFormValue) => {
    handleSubmit(
      `/api/search?serverName=${serverName}&characterName=${encodeURIComponent(
        characterName
      )}`
    );

    router.replace(
      `/search?serverName=${serverName}&characterName=${characterName}`
    );
  };

  return (
    <HStack
      as="form"
      justifyContent="center"
      spacing="2px"
      marginBottom="80px"
      onSubmit={handleFormSubmit(onSubmit)}
      position="relative"
    >
      <Select
        flex="0 0 110px"
        borderRadius="25px"
        textAlign="center"
        color="#ffffff"
        marginRight="10px"
        {...register("serverName")}
      >
        {Object.entries(SERVER_LIST).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
      <InputGroup>
        <Input
          placeholder="캐릭터명을 입력하세요."
          flex="1"
          border="1px solid #ffffff"
          borderRadius="25px"
          paddingLeft="25px"
          {...register("characterName")}
        />
        <InputRightElement>
          <IconButton
            aria-label="캐릭터 검색하기"
            type="submit"
            background="none"
            marginRight="20px"
            width="24px"
            height="24px"
            _hover={{
              background: "none",
            }}
            icon={<SearchIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
}

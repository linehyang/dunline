import {
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SERVER_LIST } from "../../interface/characterSearch";

const initialSearchFormValue = {
  serverName: "all",
  characterName: "",
};
type SearchFormValue = typeof initialSearchFormValue;

interface Props {
  handleSubmit: (url: string) => void;
}

export default function SearchForm({ handleSubmit }: Props) {
  const { register, handleSubmit: handleFormSubmit } = useForm<SearchFormValue>(
    {
      defaultValues: initialSearchFormValue,
    }
  );

  const onSubmit = ({ serverName, characterName }: SearchFormValue) => {
    handleSubmit(
      `/api/search?serverName=${serverName}&characterName=${encodeURIComponent(
        characterName
      )}`
    );
  };

  return (
    <HStack
      as="form"
      justifyContent="center"
      spacing="2px"
      marginBottom="80px"
      onSubmit={handleFormSubmit(onSubmit)}
    >
      <InputGroup>
        <InputLeftAddon background="blue.200">
          <Select
            flex="0 0 110px"
            borderRadius="0px"
            textAlign="center"
            color="#000"
            border="none"
            {...register("serverName")}
          >
            <option value="all">전체</option>
            {Object.entries(SERVER_LIST).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </InputLeftAddon>
        <Input placeholder="캐릭터명" flex="1" {...register("characterName")} />
      </InputGroup>
      <Button type="submit" colorScheme="cyan">
        검색
      </Button>
    </HStack>
  );
}

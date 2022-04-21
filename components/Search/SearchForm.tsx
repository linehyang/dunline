import { Select, Input, Button, HStack, propNames } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SERVER_LIST } from "../../interface/characterSearch";

const initialFormValue = {
  serverName: "all",
  characterName: "",
};

//typescript가 initialFormValue의 typeof로 타입을 뽑음 / FormValue에 마우스 올려보셈
//본래였으면 정의하고 바인딩해야하는데 그런 수고를 덜어줌
type FormValue = typeof initialFormValue;

interface Props {
  onUserInfo: (url: string) => void;
}

export default function SearchForm({ onUserInfo }: Props) {
  const { register, handleSubmit } = useForm<FormValue>({
    //초기값을 주기위해서 defaultValues를 선언 아래값을 주지않으면 초기값이 undefind가 됨
    defaultValues: initialFormValue,
  });

  //   const data = {serverName : '힐더', characterName: '라인향'}
  //   data.serverName  =  '힐더'
  //  {serverName, characterName} = {serverName : '힐더' , characterName: '라인향'}
  const onSubmit = ({ serverName, characterName }: FormValue) => {
    onUserInfo(
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
      marginBottom="5rem"
      minWidth="300px"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Select
        width="120px"
        borderRadius="0px"
        textAlign="center"
        {...register("serverName")}
      >
        <option value="all">전체</option>
        {Object.entries(SERVER_LIST).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
      <Input
        placeholder="캐릭터명"
        width="400px"
        {...register("characterName")}
      />
      <Button type="submit" colorScheme="teal">
        검색
      </Button>
    </HStack>
  );
}

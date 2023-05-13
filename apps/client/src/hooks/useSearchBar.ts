import { useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../interfaces/User";
import { searchUsers } from "../api/usersApi";

export const useSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);
  const { data, isFetching, isError } = useQuery<User[]>({
    queryKey: ["search", debouncedValue],
    queryFn: () => searchUsers(debouncedValue),
    enabled: Boolean(debouncedValue),
    select: (data) => data?.slice(0, 2),
  });

  const resetHandler = async () => {
    queryClient.setQueryData(["search", debouncedValue], null);
    setInputValue("");
    inputRef.current!.value = "";
  };

  return {
    inputRef,
    resetHandler,
    setInputValue,
    isFetching,
    isError,
    data,
  };
};

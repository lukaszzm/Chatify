import { useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchUsers } from "../api/users";
import type { User } from "../interfaces/User";

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
    if (inputRef.current) inputRef.current.value = "";
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

import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/UserService";

export const useUsers = () => {
  const staleTime = 60000; // default 0 - always will be considered stale; Infinity - never will be considered stale;
  const GET_USERS_QUERY = "get-users";

  const getUsers = () => {
    return UserService.getUsers();
  }

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [GET_USERS_QUERY],
    queryFn: getUsers,
    staleTime,
  });

  return {
    data,
    isFetching,
    isLoading,
    isError,
  }
}

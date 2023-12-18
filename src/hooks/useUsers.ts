import { useQuery } from "react-query";
import { UserService } from "../services/UserService";

export const useUsers = () => {
  const staleTime = 60000; // default 0 - always will be considered stale; Infinity - never will be considered stale;
  const GET_USERS_QUERY = "get-users";

  const queries = {
    GET_USERS_QUERY
  }

  const getUsers = () => {
    return UserService.getUsers();
  }

  const { data, isLoading, isFetching, isError } = useQuery(GET_USERS_QUERY, getUsers, {
    staleTime,
  });

  // const { data: users, isLoading, isError} = useQuery(GET_USERS_QUERY, {
  //   queryFn: getUsers,
  //   enabled: true,
  //   staleTime: 60000,
  // });

  // const { data: users, isLoading, isError} = useQuery({
  //   queryKey: GET_USERS_QUERY,
  //   queryFn: getUsers,
  //   enabled: true,
  //   staleTime: 60000,
  // });

  return {
    data,
    isFetching,
    isLoading,
    isError,
    queries,
  }
}

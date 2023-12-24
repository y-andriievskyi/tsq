import { useQuery, useMutation, useQueryClient } from "react-query";
import { CreateUserRequest, IUser, UserService } from "../services/UserService";

export const useUsers = () => {
  const staleTime = 60000; // default 0 - always will be considered stale; Infinity - never will be considered stale;
  const GET_USERS_QUERY = "get-users";

  const queryClient = useQueryClient();

  const queries = {
    GET_USERS_QUERY
  }

  const getUsers = () => {
    return UserService.getUsers();
  }

  const { data: users, isLoading, isFetching, isError } = useQuery(GET_USERS_QUERY, getUsers, {
    staleTime,
  });

  // https://tanstack.com/query/v4/docs/react/reference/useMutation
  const createUser = useMutation({
    mutationFn: (newUser: CreateUserRequest) => {
      return UserService.createUser(newUser);
    },
    onSuccess: (data: IUser) => {
      const currentData = queryClient.getQueryData([GET_USERS_QUERY]) as IUser[];
      queryClient.setQueryData([GET_USERS_QUERY], [...currentData, data]);
    },
    // onSettled: async () => {
    //   return await queryClient.invalidateQueries({ queryKey: [GET_USER_TODOS_QUERY] })
    // }
  });

  return {
    users,
    isFetching,
    isLoading,
    isError,
    queries,
    createUser,
  }
}

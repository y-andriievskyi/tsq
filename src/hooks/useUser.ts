import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UserService } from '../services/UserService';
import { CreateTodoRequest, ITodo, TodoService, UpdateTodoRequest } from '../services/TodoService';

interface UseUserParams {
  userId: string;
}

export const useUser = ({ userId }: UseUserParams) => {
  const staleTime = 60000; // default 0 - always will be considered stale; Infinity - never will be considered stale;
  const GET_SINGLE_USER_QUERY = 'get-single-user';
  const GET_USER_TODOS_QUERY = 'get-user-todos';

  const queryClient = useQueryClient();

  const queries = {
    GET_SINGLE_USER_QUERY,
    GET_USER_TODOS_QUERY,
  };

  const getUser = () => {
    return UserService.getUser(userId);
  };

  const getTodos = () => {
    return UserService.getTodos(userId);
  };

  // const { data: user, isLoading, isFetching, isError } = useQuery([GET_SINGLE_USER_QUERY], getUser, {
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useQuery([GET_SINGLE_USER_QUERY, userId], getUser, {
    staleTime,
  });

  const {
    data: todos,
    isLoading: todosLoading,
    isFetching: todosFetching,
    isError: todosError,
  } = useQuery([GET_USER_TODOS_QUERY, userId], getTodos, {
    enabled: !!userId,
    staleTime,
  });


  const createTodo = useMutation({
    mutationFn: (newTodo: CreateTodoRequest) => {
      return TodoService.createTodo(newTodo);
    },
    onSuccess: (data: ITodo) => {
      const currentData = queryClient.getQueryData([GET_USER_TODOS_QUERY, userId]) as ITodo[];
      queryClient.setQueryData([GET_USER_TODOS_QUERY, userId], [...currentData, data]);
    },
    // onSettled: async () => {
    //   return await queryClient.invalidateQueries({ queryKey: [GET_USER_TODOS_QUERY] })
    // },
  });

  const updateUserTodo = (id: string, params: UpdateTodoRequest) => {
    return TodoService.updateTodo(id, params);
  }

  const updateTodo = useMutation(async (params: UpdateTodoRequest & { id: string }) => {
    const { id, ...todoParams } = params;
    return await updateUserTodo(id, todoParams);
  }, {
    onSuccess: (data: ITodo) => {
      
      const currentData = queryClient.getQueryData([GET_USER_TODOS_QUERY, userId]) as ITodo[];
      console.log(data, currentData);
      currentData.find((todo) => todo._id === data._id)!.completed = data.completed;
      queryClient.setQueryData([GET_USER_TODOS_QUERY, userId], [...currentData]);
    },
    // onSettled: async () => {
    //   return await queryClient.invalidateQueries({ queryKey: [GET_USER_TODOS_QUERY] })
    // }
  });

  return {
    queries,
    user,
    isFetching,
    isLoading,
    isError,
    todos,
    todosError,
    todosLoading,
    todosFetching,
    createTodo,
    updateTodo,
  };
};

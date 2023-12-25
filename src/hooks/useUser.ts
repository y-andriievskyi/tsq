import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, UserService } from '../services/UserService';
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
  } = useQuery<IUser>({
    queryKey: [GET_SINGLE_USER_QUERY, userId],
    queryFn: getUser,
    staleTime,
  });

  const {
    data: todos,
    isLoading: todosLoading,
    isFetching: todosFetching,
    isError: todosError,
  } = useQuery<ITodo[]>({
    queryKey: [GET_USER_TODOS_QUERY, userId],
    queryFn: getTodos,
    staleTime,
  });


  const createTodo = useMutation({
    mutationFn: (newTodo: CreateTodoRequest) => {
      return TodoService.createTodo(newTodo);
    },
    onSuccess: (data: ITodo) => {
      const currentData = queryClient.getQueryData<ITodo[]>([GET_USER_TODOS_QUERY, userId])!;
      queryClient.setQueryData([GET_USER_TODOS_QUERY, userId], [...currentData, data]);
    },
    // onSettled: async () => {
    //   return await queryClient.invalidateQueries({ queryKey: [GET_USER_TODOS_QUERY] })
    // },
  });

  const updateUserTodo = (id: string, params: UpdateTodoRequest) => {
    return TodoService.updateTodo(id, params);
  }

  const updateTodo = useMutation({
    mutationFn: async (params: UpdateTodoRequest & { id: string }) => {
      const { id, ...todoParams } = params;
      return await updateUserTodo(id, todoParams);
    },
    onSuccess: (updatedTodo: ITodo) => {
      const previousTodos = queryClient.getQueryData<ITodo[]>([GET_USER_TODOS_QUERY, userId])!;
      const mutatedTodo = previousTodos.find((todo) => todo._id === updatedTodo._id)!;
      mutatedTodo.completed = updatedTodo.completed;
      queryClient.setQueryData([GET_USER_TODOS_QUERY, userId], [...previousTodos]);
    },
    onMutate: async (params: UpdateTodoRequest & { id: string }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [GET_USER_TODOS_QUERY, userId] });
  
      const previousTodos = queryClient.getQueryData<ITodo[]>([GET_USER_TODOS_QUERY, userId]) || [];

      const mutatedTodo = previousTodos.find((todo: ITodo) => todo._id === params.id)!;
      mutatedTodo.completed = params.completed;
  
      // Optimistically update to the new value
      queryClient.setQueryData([GET_USER_TODOS_QUERY, userId], (old: ITodo[]) => [...old]);
  
      // Return a context object with the snapshotted value
      return { previousTodos }
    },
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

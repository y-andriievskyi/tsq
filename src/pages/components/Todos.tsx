import { Loader } from '../../components';
import { useUser } from '../../hooks/useUser';
import {
  CreateTodoRequest,
  ITodo,
  UpdateTodoRequest,
} from '../../services/TodoService';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

export const Todos = ({ userId }: { userId: string }) => {
  const { todos, isLoading, isError, createTodo, updateTodo } = useUser({
    userId,
  });

  const completeTodo = (params: UpdateTodoRequest & { id: string }) => {
    updateTodo.mutate(params);
  };

  return (
    <div className="todo">
      <TodoForm
        userId={userId}
        handleSubmit={(data: CreateTodoRequest) => createTodo.mutate(data)}
        isLoading={createTodo.isPending}
        isError={createTodo.isError}
        error={createTodo.error as { message: string }}
        reset={() => createTodo.reset()}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="todo-list">
          {isError && <p>Error: {isError}</p>}
          {todos &&
            todos.map((todo: ITodo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                isUpdating={updateTodo.isPending && updateTodo.variables?.id === todo._id}
                completeTodo={completeTodo}
              />
            ))}
        </div>
      )}
    </div>
  );
};

import { ITodo, UpdateTodoRequest } from '../../services/TodoService';

export const TodoItem = ({
  todo: { _id, title, completed },
  isUpdating,
  completeTodo,
}: {
  todo: ITodo;
  isUpdating: boolean;
  completeTodo: (params: UpdateTodoRequest & { id: string }) => void;
}) => {
  return (
    <div className="todo-item">
      {title}
      {isUpdating ? (
        <span className="css-loader"></span>
      ) : (
        <button
          className={completed ? 'completed' : ''}
          onClick={() => {
            completeTodo({
              id: _id,
              completed: !completed,
            });
          }}
        />
      )}
    </div>
  );
};

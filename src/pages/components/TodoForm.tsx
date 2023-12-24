import { FormEvent } from 'react';
import { CreateTodoRequest } from '../../services/TodoService';

interface ITodoForm {
  handleSubmit: (data: CreateTodoRequest) => void;
  reset: () => void;
  userId: string;
  error: { message: string };
  isLoading: boolean;
  isError: boolean;
}

export const TodoForm = ({
  handleSubmit,
  reset,
  userId,
  isLoading,
  isError,
  error,
}: ITodoForm) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    handleSubmit({
      userId: formData.get('userId') as string,
      title: formData.get('title') as string,
    });
  }

  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      <div className="form-wrapper">
        <input type="hidden" name="userId" value={userId}/>
        <input type="text" name="title" placeholder="Enter title" onFocus={reset}/>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create todo'}</button>
      </div>
      {isError && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

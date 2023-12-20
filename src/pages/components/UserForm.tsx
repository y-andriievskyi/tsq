import { FormEvent } from 'react';
import { CreateUserRequest } from '../../services/UserService';

interface IUserForm {
  handleSubmit: (data: CreateUserRequest) => void;
  reset: () => void;
  error: { message: string };
  isLoading: boolean;
  isError: boolean;
}

export const UserForm = ({
  handleSubmit,
  reset,
  isLoading,
  isError,
  error,
}: IUserForm) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    handleSubmit({
      username: formData.get('username') as string,
    });
  }

  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      <div className="form-wrapper">
        <input type="text" name="username" placeholder="Enter name" onFocus={reset}/>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create user'}</button>
      </div>
      {isError && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

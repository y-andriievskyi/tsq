import { Link } from 'react-router-dom';
import { Loader } from '../components';
import { useUsers } from '../hooks';
import { UserItem } from './components/UserItem';
import { UserForm } from './components/UserForm';
import { useMemo } from 'react';
import { CreateUserRequest } from '../services/UserService';

export const Users = () => {
  const { data, isLoading, isError, createUser } = useUsers();
  const loading = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  return (
    <div className="page">
      <h1>
        <Link to={'/'}>Users</Link>
      </h1>
      <UserForm
        handleSubmit={(data: CreateUserRequest) => createUser.mutate(data)}
        isLoading={createUser.isLoading}
        isError={createUser.isError}
        error={createUser.error as { message: string }}
        reset={() => createUser.reset()}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="users-list">
          {isError && <p>Error: {isError}</p>}
          {data && data.map((user) => <UserItem key={user._id} user={user} />)}
        </div>
      )}
    </div>
  );
};

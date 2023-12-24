import { Loader } from '../components';
import { useUsers } from '../hooks';
import { UserItem } from './components/UserItem';
import { UserForm } from './components/UserForm';
import { CreateUserRequest } from '../services/UserService';
import { Navigation } from '../pages/components/Navigation';

export const Users = () => {
  const { users, isLoading, isError, createUser } = useUsers();

  return (
    <>
      <Navigation />
      <div className="page">
        <UserForm
          handleSubmit={(data: CreateUserRequest) => createUser.mutate(data)}
          isLoading={createUser.isLoading}
          isError={createUser.isError}
          error={createUser.error as { message: string }}
          reset={() => createUser.reset()}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="users-list">
            {isError && <p>Error: {isError}</p>}
            {users &&
              users.map((user) => <UserItem key={user._id} user={user} />)}
          </div>
        )}
      </div>
    </>
  );
};

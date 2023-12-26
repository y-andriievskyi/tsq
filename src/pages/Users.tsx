import { Link } from 'react-router-dom';
import { Loader } from '../components';
import { useUsers } from '../hooks';
import { UserItem } from './components/UserItem';
import { useMemo } from 'react';

export const Users = () => {
  const { data, isPending, isError } = useUsers();

  return (
    <div className="page">
      <h1>
        <Link to={'/'}>Users</Link>
      </h1>
      {isPending ? (
        <Loader />
      ) : (
        <div className="users-list">
          {isError && <p>Error: {isError}</p>}
          {data && data.map((user) => <UserItem user={user} />)}
        </div>
      )}
    </div>
  );
};

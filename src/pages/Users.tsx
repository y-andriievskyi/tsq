import { Link } from 'react-router-dom';
import { Loader } from '../components';
import { useUsers } from '../hooks';
import { UserItem } from './components/UserItem';
import { useMemo } from 'react';

export const Users = () => {
  const { data, isLoading, isFetching, isError } = useUsers();
  const loading = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  return (
    <div className="page">
      <h1>
        <Link to={'/'}>Users</Link>
      </h1>
      {loading ? (
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

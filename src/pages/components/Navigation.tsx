import { NavLink, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export const Navigation = () => {
  const { userId } = useParams();

  if (!userId) {
    return (
      <nav className="nav">
        <h1>
          <NavLink to={'/'}>Users</NavLink>
        </h1>
      </nav>
    );
  }

  const { user, isLoading } = useUser({
    userId,
  });

  return (
    <nav className="nav">
      {!isLoading && (
        <h1 className="with-back">
          <NavLink to={'/'}>{'< Back'}</NavLink>
          {user?.username}
        </h1>
      )}
    </nav>
  );
};

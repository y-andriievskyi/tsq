import { Link } from 'react-router-dom';
import { IUser } from '../../services/UserService';

export const UserItem = ({ user }: { user: IUser }) => {
  return <Link to={`/user/${user._id}`}>{user.username}</Link>;
};

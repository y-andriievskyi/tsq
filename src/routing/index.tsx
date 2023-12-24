import { Route, Routes } from 'react-router-dom';
import { Users, User } from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/user/:userId" element={<User />} />
    </Routes>
  );
};

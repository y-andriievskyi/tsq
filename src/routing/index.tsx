import { Route, Routes } from 'react-router-dom';
import { Users, User, Extra } from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="/extra" element={<Extra />} />
    </Routes>
  );
};

import { Route, Routes } from 'react-router-dom';
import { Users } from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />}>
        <Route path="/user/:id" element={<Users />}></Route>
      </Route>
    </Routes>
  );
};

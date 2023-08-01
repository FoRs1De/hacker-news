import Menu from './Menu';
import { Outlet } from 'react-router-dom';
const MainLayout = ({ handleChange, handleSubmit, setSearch, setShow }) => {
  return (
    <>
      <Menu
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setSearch={setSearch}
        setShow={setShow}
      />
      <Outlet />
    </>
  );
};

export default MainLayout;

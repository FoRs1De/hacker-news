import { NavLink } from 'react-router-dom';

const Menu = ({ handleChange, handleSubmit, setSearch, setShow }) => {
  return (
    <nav>
      <div className="Logo">
        <h1>Hacker News</h1>
      </div>
      <div className="Links">
        <NavLink
          to="/"
          onClick={() => {
            setSearch('tags=front_page');
            setShow(10);
          }}
        >
          Home
        </NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>
    </nav>
  );
};

export default Menu;

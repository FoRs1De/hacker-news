import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

const Menu = ({ handleChange, handleSubmit, setSearch, setShow }) => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  return (
    <nav>
      <div className="Logo">
        <NavLink
          className="Logo"
          to="/"
          onClick={() => {
            setSearch('');
            setShow(10);
          }}
        >
          <h1>Hacker News</h1>
        </NavLink>
      </div>
      <div className="Links"></div>
      <form onSubmit={handleSubmit}>
        <Search id="search">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            id="input"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </form>
    </nav>
  );
};

export default Menu;

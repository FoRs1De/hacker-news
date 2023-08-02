import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useState, useEffect } from 'react';

function App() {
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('tags=front_page');
  const navigate = useNavigate();
  const handleChange = (e) => {
    let value = e.target.value;
    setSearch(`query=${value}`);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    setShow(10);
    if (document.querySelector('input').value === '') {
      setSearch(`tags=front_page`);
      navigate(`/`);
      setShow(10);
    }

    document.querySelector('input').value = '';
  };
  let handleButtonClick = () => {
    setShow(show + 10);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setSearch={setSearch}
              setShow={setShow}
            />
          }
        >
          <Route
            index
            element={
              <Home
                search={search}
                handleButtonClick={handleButtonClick}
                page={page}
                show={show}
                setPage={setPage}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

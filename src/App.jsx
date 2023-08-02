import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useState, useEffect } from 'react';

function App() {
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    let value = e.target.value;
    setSearch(`query=${value}`);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setShow(10);
    let inputValue = `query=${document.querySelector('#input').value}`;
    let navPlacement = document.querySelector('#input').value;
    if (document.querySelector('#input').value === '') {
      setSearch(inputValue);
      navigate(`/`);
      setShow(10);
    }
    setSearch(inputValue);
    navigate(`/?${navPlacement}`);
  };
  let handleButtonClick = () => {
    setShow(show + 10);
  };

  useEffect(() => {
    navigate('/');
  }, []);

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

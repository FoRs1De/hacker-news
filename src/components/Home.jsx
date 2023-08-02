import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Home = ({ search, handleButtonClick, page, show, setPage }) => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(page);
  useEffect(() => {
    axios
      .get(
        `http://hn.algolia.com/api/v1/search_by_date?${search}&hitsPerPage=${show}&page=${page}`
      )
      .then(function (response) {
        // handle success
        setItems(response.data.hits);
        setTotalPages(response.data.nbPages - 1);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [search, show, page]);

  let availableItems = items.filter((item) => {
    return item.title !== null;
  });

  function expandArray(n) {
    if (n <= 0) {
      return [];
    }

    return Array.from({ length: n }, (_, index) => index + 1);
  }

  let paginationArray = expandArray(totalPages);

  let handlePaginationClick = (e) => {
    let number = parseInt(e.target.textContent, 10);
    setPage(number);
    setActivePage(number);
  };

  return (
    <div className="Home">
      {!items ? (
        <h1>Loading...</h1>
      ) : availableItems.length === 0 ? (
        <center>
          <h1>No available items for this time, just push load more...</h1>
        </center>
      ) : (
        availableItems.map((item, index) => (
          <div key={index}>
            <div className="title">
              <p>{index + 1}</p>
              <Link to={item.url} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
              </Link>
            </div>
            <p>Author: {item.author}</p>
            <p>Created: {item.created_at}</p>
            <hr />
          </div>
        ))
      )}
      <center>
        <button onClick={handleButtonClick}>Show more...</button>
      </center>
      <div className="pagination">
        {paginationArray.map((item, index) => {
          return (
            <span key={index}>
              <NavLink
                className={`paginationItem${
                  activePage === item ? '-active' : ''
                }`}
                to=""
                onClick={handlePaginationClick}
              >
                {item}
              </NavLink>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

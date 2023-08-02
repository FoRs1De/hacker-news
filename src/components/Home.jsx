import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Fab } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home = ({ search, handleButtonClick, page, show, setPage }) => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(page);
  let startItemNumber = (page - 1) * show;
  useEffect(() => {
    axios
      .get(
        `http://hn.algolia.com/api/v1/search?${search}&hitsPerPage=${show}&page=${page}`
      )
      .then(function (response) {
        // handle success
        setItems(response.data.hits);
        setTotalPages(response.data.nbPages - 1);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [search, show, page]);
  console.log(
    `http://hn.algolia.com/api/v1/search?${search}&hitsPerPage=${show}&page=${page}`
  );
  let availableItems = items.filter((item) => {
    return item.title !== null;
  });

  let sortedItemsByDate = [...items].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  function expandArray(n) {
    if (n <= 0) {
      return [];
    }

    return Array.from({ length: n }, (_, index) => index + 1);
  }

  let paginationArray = expandArray(totalPages).slice(0, 20);

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
        sortedItemsByDate.map((item, index) => (
          <div key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="title">
                  <p>{startItemNumber + index + 1}.</p>
                  <Link
                    className="link"
                    to={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{item.title}</h3>
                  </Link>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <p>Author: {item.author}</p>
                <p>Created: {item.created_at}</p>
              </AccordionDetails>
            </Accordion>
            <br />
          </div>
        ))
      )}
      <center>
        <Button variant="contained" id="button" onClick={handleButtonClick}>
          Show more...
        </Button>
      </center>
      <div className="pagination">
        {paginationArray.map((item, index) => {
          return (
            <span key={index}>
              <Fab
                variant="extended"
                size="small"
                color={activePage === item ? 'secondary' : 'primary'}
                aria-label="add"
                onClick={handlePaginationClick}
              >
                {item}
              </Fab>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

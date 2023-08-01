import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ search, handleButtonClick, page, show }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://hn.algolia.com/api/v1/search_by_date?${search}&hitsPerPage=${show}`
      )
      .then(function (response) {
        // handle success
        setItems(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [search, show]);

  let availableItems = items.filter((item) => {
    return item.title !== null;
  });
  console.log(availableItems);
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
      <button onClick={handleButtonClick}>Show more...</button>
    </div>
  );
};

export default Home;

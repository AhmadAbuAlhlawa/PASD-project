import React, { useState } from "react";
import "../css/Searchb.css";
const Searchb = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [results, setResults] = useState(""); // State to hold search results
  const [data, setData] = useState([]);

  const handleSearch = () => {
    if (query.trim() === "") {
      setResults("Please enter a search term!");
    } else {
      setResults(`You searched for: ${query}`);
      fetch(`http://localhost:5000/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }
  };
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setResults("");
      setData([]);
    }
  };
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div>{results && <p>{results}</p>}</div>
      <div>
        {query.length > 0 && data.length > 0 && (
          <ul className="search-results">
            {data.map((item, index) => {
              let link = "#"; // Default link

              // Assign links based on item type
              if (item.type === "building") {
                link = `/buildings/${item._id}`;
              } else if (item.type === "architect") {
                link = `/architects/${item._id}`;
              } else if (item.type === "city") {
                link = `/map/${item._id}`;
              }

              return (
                <>
                  <li key={index}>
                    <a href={link}>
                      Type: {item.type},
                      <br />
                      Title: {item.title}
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Searchb;
